import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

const linkColumns = [
    {
        title: 'Company',
        links: [
            { label: 'Features', to: '/' },
            { label: 'Pricing', to: '/' },
            { label: 'Affiliate Program', to: '/' },
            { label: 'Press Kit', to: '/' },
        ],
    },
    {
        title: 'Support',
        links: [
            { label: 'Account', to: '/' },
            { label: 'Help', to: '/' },
            { label: 'Contact Us', to: '/' },
            { label: 'Customer Support', to: '/' },
        ],
    },
    {
        title: 'Legals',
        links: [
            { label: 'Terms & Conditions', to: '/' },
            { label: 'Privacy Policy', to: '/' },
            { label: 'Licensing', to: '/' },
        ],
    },
]

function Footer() {
    return (
        <footer className="border-t-2 border-t-black bg-gray-500">
            <div className="mx-auto max-w-7xl px-4 py-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="shrink-0">
                        <Logo width="80px" />
                        <p className="mt-2 text-xs text-gray-800">
                            &copy; Copyright 2026. All Rights Reserved by DevUI.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3 lg:gap-x-12">
                        {linkColumns.map((column) => (
                            <div key={column.title}>
                                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-700">
                                    {column.title}
                                </h3>
                                <ul className="space-y-1.5">
                                    {column.links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                to={link.to}
                                                className="text-sm font-medium text-gray-900 transition-colors hover:text-gray-700"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
