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

    const formattedDate = new Date(post?.$createdAt).toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric",
        }
    );

    const plainText = post?.content
        ? post.content.replace(/<[^>]*>/g, "")
        : "";

    const wordCount = plainText.trim()
        ? plainText.trim().split(/\s+/).length
        : 0;

    const readingTime = Math.max(
        1,
        Math.ceil(wordCount / 200)
    );

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
        <article className="py-16 md:py-24 bg-theme-bg">
            <Container>
                <div className="max-w-3xl mx-auto">
                    <header className="mb-12">
                        <div className="text-sm font-semibold text-theme-accent mb-4 uppercase tracking-widest">Engineering</div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-theme-text mb-8 leading-[1.1] tracking-tight">{post.title}</h1>

                        <div className="flex items-center justify-between border-y border-theme-border py-4 mb-10">
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                                    {post.authorName?.charAt(0)?.toUpperCase() || "B"}
                                </div>

                                <div>
                                    <p className="font-medium text-theme-text">
                                        {post.authorName || "Blogify Author"}
                                    </p>

                                    <p className="text-sm text-theme-secondary">
                                        {formattedDate}
                                        <span className="mx-2">·</span>
                                        {readingTime} min read
                                    </p>
                                </div>
                            </div>

                            {isAuthor && (
                                <div className="flex items-center gap-3">
                                    <Link to={`/edit-post/${post.$id}`} className="text-sm font-medium text-theme-accent hover:text-theme-accentHover transition-colors">
                                        Edit
                                    </Link>
                                    <button onClick={deletePost} className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors">
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </header>

                    <div className="mb-14 w-full">
                        <figure className="w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-lg bg-gray-100 border border-theme-border">
                            <AppwriteImage
                                fileId={post}
                                alt={post.title}
                                detail
                                className="w-full h-full object-cover"
                            />
                        </figure>
                        <figcaption className="text-center text-theme-secondary text-sm mt-3 italic">Featured image for {post.title}</figcaption>
                    </div>

                    <div className="prose prose-lg prose-slate max-w-none text-theme-text font-serif leading-relaxed prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight prose-a:text-theme-accent hover:prose-a:text-theme-accentHover prose-img:rounded-lg">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </article>
    ) : null;
}
