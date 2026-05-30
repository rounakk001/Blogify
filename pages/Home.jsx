import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Service from "../src/appwrite/config";
import { Container, PostCard } from '../src/components'

function Home() {
    const [posts, setPosts] = useState([])
    const [catImage,setCatImage]=useState("")
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        if (!authStatus) {

            fetch("https://api.thecatapi.com/v1/images/search")
            .then((response)=>response.json())
            .then((data)=>{
                setCatImage(data[0].url)
            })
            .catch((error)=>console.log(error))

            setPosts([])
            return
        }

        let cancelled = false

        Service.getAllPosts().then((result) => {
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
    }, [authStatus])
    if (!authStatus) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
            {catImage && (
                <img
                    src={catImage}
                    alt="Cute Cat"
                    className="w-80 h-80 object-cover rounded-xl shadow-lg"
                />
            )}

            <h1 className="mt-6 text-4xl font-bold">
                Oops!
            </h1>

            <p className="mt-2 text-lg text-gray-500">
                Need to login to see posts!!
            </p>
        </div>
    )
}

    return (
        <div className='w-full py-8'>
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

export default Home
