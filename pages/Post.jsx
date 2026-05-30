import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Service from "../src/appwrite/config";
import { Button, Container, AppwriteImage } from "../src/components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

function getPostAuthorId(post) {
    return post?.userID ?? post?.userId ?? post?.userid ?? null;
}

function isPostAuthor(post, userId) {
    if (!post || !userId) return false;

    if (getPostAuthorId(post) === userId) return true;

    return post.$permissions?.some((permission) =>
        permission.includes(`user:${userId}`)
    );
}

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor =
        authStatus &&
        post &&
        userData &&
        isPostAuthor(post, userData.$id);

    useEffect(() => {
        if (slug) {
            Service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        Service.deletePost(post.$id).then((status) => {
            if (status) {
                Service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="relative mb-4 w-full rounded-xl border p-2">
                    <AppwriteImage
                        fileId={post}
                        alt={post.title}
                        detail
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6 z-10 flex items-center">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                <div className="mb-4 w-full">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>

                <div className="browser-css text-gray-600">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
