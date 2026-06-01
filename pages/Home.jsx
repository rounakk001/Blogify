import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Service from "../src/appwrite/config";
import { Container, PostCard } from '../src/components'
import { Link } from 'react-router-dom'
import { useSearchParams } from "react-router-dom";

function Home() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state) => state.auth.status)
    const [loading, setLoading] = useState(true)
    const [searchParams] = useSearchParams();

    const searchTerm = searchParams.get("search") || "";

    const tags = [
        "Technology",
        "Travel",
        "Design",
        "Books",
        "Career",
        "Lifestyle",
        "AI",
        "Programming"
    ];

    useEffect(() => {
        let cancelled = false
        setLoading(true)

        Service.getAllPosts().then((result) => {
            if (cancelled) return

            if (result) {
                setPosts(result.documents)
            } else {
                setPosts([])
            }

            setLoading(false)
        })

        return () => {
            cancelled = true
        }
    }, [])




    if (loading) {
        return <div className="min-h-[60vh] flex items-center justify-center">Loading...</div>
    }

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const featuredPosts = filteredPosts.slice(0, 3);
    const remainingPosts = filteredPosts.slice(3);

    const topics = ["Engineering", "Product", "Design", "Career", "React", "Architecture"];

    return (
        <div className='w-full'>
            {/* Hero Section */}
            {!authStatus && (
                <section className="py-32 md:py-40 border-b border-theme-border">
                    <Container>
                        <div className="max-w-4xl mx-auto text-center ">

                            <h1 className="text-5xl md:text-7xl font-serif font-bold text-theme-text leading-none tracking-tight mb-8">
                                Read less noise.

                                <br />
                                Build better thinking.
                            </h1>

                            <p className="text-lg md:text-xl text-theme-secondary max-w-2xl mx-auto leading-relaxed mb-10">
                                Read, share, and discover stories that inform, inspire, and spark new thinking.
                            </p>


                            <div className="flex justify-center">
                                <button
                                    onClick={() =>
                                        document
                                            .getElementById("featured-posts")
                                            ?.scrollIntoView({
                                                behavior: "smooth",
                                                block: "start",
                                            })
                                    }
                                    className="
    group relative overflow-hidden
    inline-flex items-center gap-2
    px-7 py-3
    bg-black text-white
    font-medium
    rounded-full
    hover:shadow-xl
    transition-all duration-300
    hover:scale-105
hover:-translate-y-1
    "
                                >
                                    <span className="relative z-10">
                                        Explore Articles
                                    </span>

                                    <span className="
        relative z-10
        transition-transform duration-300
        group-hover:translate-x-1
    ">
                                        →
                                    </span>
                                </button>
                            </div>
                            <div className="flex flex-wrap justify-center gap-3 mt-20">
                                {tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-4 py-2 text-sm rounded-full border border-theme-border hover:border-black hover:-translate-y-1 transition-all duration-300"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Container>
                </section>
            )}

            <Container>
                <div className="flex flex-col lg:flex-row gap-12 py-16">
                    {/* Main Content Area */}
                    <div className="lg:w-2/3">
                    
                        {/* Featured Articles */}
                        {posts.length === 0 ? (
                            <div className="py-16 text-center border border-dashed border-theme-border rounded-xl">
                                <h3 className="text-2xl font-serif font-bold mb-2">
                                    No articles yet
                                </h3>

                                <p className="text-theme-secondary mb-6">
                                    Be the first to share your thoughts.
                                </p>

                                <Link
                                    to="/add-post"
                                    className="text-theme-accent hover:text-theme-accentHover font-medium underline"
                                >
                                    Write your first article
                                </Link>
                            </div>
                        ) : filteredPosts.length === 0 ? (
                            <div className="py-16 text-center">
                                <h3 className="text-2xl font-serif font-bold mb-2">
                                    No matching articles found
                                </h3>

                                <p className="text-theme-secondary">
                                    Try searching with a different keyword.
                                </p>
                            </div>
                        ) : (
                            <section id="featured-posts" className="mb-16 scroll-mt-24">
                                <h2 className="text-xl font-bold uppercase tracking-wider text-theme-secondary mb-8 pb-4 border-b border-theme-border">
                                    Featured
                                </h2>

                                <div className="flex flex-col gap-10">
                                    {featuredPosts.map((post) => (
                                        <PostCard
                                            key={post.$id}
                                            {...post}
                                            featured={true}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Latest Articles */}
                        {remainingPosts.length > 0 && (
                            <section>
                                <h2 className="text-xl font-bold uppercase tracking-wider text-theme-secondary mb-8 pb-4 border-b border-theme-border">Latest</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {remainingPosts.map((post) => (
                                        <PostCard key={post.$id} {...post} />
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/3 space-y-12">
                        {/* Topics Section */}
                        <div>
                            <h2 className="text-sm font-bold uppercase tracking-wider text-theme-secondary mb-6">Topics</h2>
                            <div className="flex flex-wrap gap-2">
                                {topics.map(topic => (
                                    <span key={topic} className="px-3 py-1 bg-white border border-theme-border rounded-full text-sm hover:border-theme-text transition-colors cursor-pointer">
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter Section */}
                        <div className="bg-white border border-theme-border p-6 rounded-xl">
                            <h3 className="font-serif font-bold text-xl mb-2">Subscribe to newsletter</h3>
                            <p className="text-theme-secondary text-sm mb-4">Get the latest articles delivered straight to your inbox.</p>
                            <form className="flex flex-col gap-3">
                                <input type="email" placeholder="Your email address" className="px-4 py-2 border border-theme-border rounded-lg bg-theme-bg focus:outline-none focus:border-theme-text w-full" />
                                <button type="button" className="px-4 py-2 bg-theme-text text-white rounded-lg font-medium hover:bg-black transition-colors w-full">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Home
