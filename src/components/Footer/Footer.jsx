import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
    return (
        <footer className="border-t border-theme-border bg-theme-bg mt-20">
            <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="flex flex-col gap-4">
                        <Link to="/" className="flex items-center gap-2">
                            <Logo width="32px" />
                            
                        </Link>
                        <p className="text-sm text-theme-secondary max-w-xs">
                            Thoughtful articles for developers, builders and curious minds.
                        </p>
                    </div>
                    
                    <div className="flex gap-8 text-sm font-medium">
                        <Link to="/" className="text-theme-secondary hover:text-theme-text transition-colors">About</Link>
                        <Link to="/" className="text-theme-secondary hover:text-theme-text transition-colors">RSS</Link>
                        <Link to="/" className="text-theme-secondary hover:text-theme-text transition-colors">Twitter</Link>
                        <Link to="/" className="text-theme-secondary hover:text-theme-text transition-colors">GitHub</Link>
                    </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-theme-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-theme-secondary">
                    <p>&copy; {new Date().getFullYear()} Blogify. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link to="/" className="hover:text-theme-text transition-colors">Privacy</Link>
                        <Link to="/" className="hover:text-theme-text transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
