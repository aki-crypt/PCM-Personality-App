'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import { BLOG_POSTS } from '../../data/blogPosts';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export default function BlogPostPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-[#FAFAF9] font-sans">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/blog" className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors flex items-center">
                        ← Back to Columns
                    </Link>
                    <Link href="/" className="text-lg font-serif font-bold text-gray-900 tracking-tight">
                        Deux Rêves <span className="text-yellow-600">.</span>
                    </Link>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <article>
                    <div className="text-center mb-12">
                        <div className="inline-block bg-yellow-50 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                            {post.category}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                            <time>{post.publishedAt}</time>
                            <span>•</span>
                            <div className="flex gap-2">
                                {post.tags.map(tag => (
                                    <span key={tag} className="text-gray-400">#{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="prose prose-stone prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-yellow-700 hover:prose-a:text-yellow-800 font-mincho leading-loose tracking-wide">
                        <ReactMarkdown>
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    {post.references && post.references.length > 0 && (
                        <div className="mt-16 pt-8 border-t border-gray-200">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 font-sans">
                                Scientific References / Evidence
                            </h3>
                            <ul className="space-y-3">
                                {post.references.map((ref, index) => (
                                    <li key={index} className="text-xs text-gray-500 font-mono leading-relaxed pl-4 -indent-4">
                                        <span className="font-bold text-gray-300 mr-2">[{index + 1}]</span>
                                        {ref}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </article>

                {/* Call to Action */}
                <div className="mt-20 p-8 bg-gray-900 rounded-2xl text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-600 opacity-10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-serif font-bold mb-4">あなたの才能を科学的に分析しますか？</h3>
                        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                            ビッグファイブ理論に基づいた最新の性格診断で、あなたの強みとキャリアの可能性を発見しましょう。
                        </p>
                        <Link href="/" className="inline-block bg-white text-gray-900 font-bold px-8 py-3 rounded-full hover:bg-yellow-50 transition-colors">
                            無料で診断を受ける
                        </Link>
                    </div>
                </div>
            </main>

            <footer className="bg-white border-t border-gray-100 py-12 mt-12">
                <div className="max-w-5xl mx-auto px-4 text-center text-gray-400 text-sm">
                    <p>&copy; 2026 Deux Rêves. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
