import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../src/components'
import Service from "../src/appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {

    // State to store the post data
    const [post, setPosts] = useState(null)

    // Get slug (post ID) from URL parameters
    const { slug } = useParams()

    // Hook for programmatic navigation
    const navigate = useNavigate()

    // Runs when component mounts or slug changes
    useEffect(() => {

        // Check if slug exists in URL
        if (slug) {

            // Fetch the post using the slug
            Service.getPost(slug).then((post) => {

                // If post is found, save it in state
                if (post) {
                    setPosts(post)
                }
            })

        } else {

            // If no slug is provided, redirect to home page
            navigate('/') 
        }

    }, [slug, navigate])

    // Render PostForm only when post data is available
    return post ? (
        <div className='py-8'>
            <Container>

                {/* Pass fetched post data to PostForm for editing */}
                <PostForm post={post} />

            </Container>
        </div>
    ) : null // Show nothing while data is loading
}

export default EditPost