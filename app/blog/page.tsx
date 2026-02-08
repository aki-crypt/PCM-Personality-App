'use client';

import React from 'react';
import { BLOG_POSTS, BlogPost } from '../data/blogPosts';
import Link from 'next/link';

export default function BlogIndex() {
    // Sort by publishedAt desc
    const sortedPosts = [...BLOG_POSTS].sort((a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return (
        <div className="min-h-screen bg-[#FAFAF9] font-sans">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="text-xl font-serif font-bold text-gray-900 tracking-tight">
                        PCM <span className="text-yellow-600">.</span>
                    </Link>
                    <nav>
                        <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                            Back to Home
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gray-900 text-white py-20 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-600 opacity-10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="max-w-5xl mx-auto relative z-10 text-center">
                    <p className="text-yellow-500 font-bold tracking-widest uppercase mb-4 text-xs">Science & Columns</p>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                        Personality Science <br /> for Executives
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        最新の性格心理学と行動科学に基づく、キャリア、健康、そして人間関係を最適化するためのインサイト。
                    </p>
                </div>
            </section>

            {/* Blog Grid */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {sortedPosts.map((post) => (
                        <article key={post.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full overflow-hidden group">
                            <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                                <div className="p-6 flex flex-col h-full">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-[10px] font-bold text-yellow-700 bg-yellow-50 px-2 py-1 rounded uppercase tracking-wider">
                                            {post.category}
                                        </span>
                                        <span className="text-xs text-gray-400 ml-auto">
                                            {post.publishedAt}
                                        </span>
                                    </div>
                                    <h2 className="text-xl font-serif font-bold text-gray-900 mb-3 group-hover:text-yellow-700 transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-xs font-bold text-gray-900 uppercase tracking-widest group-hover:tracking-widest transition-all">
                                        Read Article <span className="ml-2 text-yellow-600">→</span>
                                    </div>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 py-12 mt-12">
                <div className="max-w-5xl mx-auto px-4 text-center text-gray-400 text-sm">
                    <p>&copy; 2026 Personality Career Match. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
