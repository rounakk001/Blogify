
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Query } from 'appwrite'
import { PostCard } from '../src/components';
import { Container } from '../src/components';
import Service from "../src/appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
        if (!authStatus || !userData?.$id) {
            setPosts([])
            return
        }

        let cancelled = false

        Service.getAllPosts([
            Query.equal("userID", userData.$id),
        ]).then((result) => {
            if (cancelled) return

            if (result) {
                setPosts(result.documents)
            } else {
                setPosts([])
            }
        })

        return () => {
            cancelled = true
        }
    }, [authStatus, userData])

    return (
        <div className='w-full py-8 text-center'>

            <Container>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
