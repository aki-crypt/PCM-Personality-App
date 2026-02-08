'use client';

import React from 'react';
import Link from 'next/link';
import { BLOG_POSTS } from '../data/blogPosts';

export default function LandingPage({ onSelectMode }: { onSelectMode: (mode: 'NEO' | 'CLASSIC') => void }) {
    return (
        <div className="min-h-screen bg-[#FAFAF9] font-sans">

            {/* Hero Section */}
            <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-[#FAFAF9] z-0"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-200 opacity-10 blur-[120px] rounded-full z-0"></div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <p className="text-sm md:text-base font-bold text-gray-500 tracking-[0.3em] uppercase mb-6 font-serif animate-fade-in-up">
                        Scientific Self-Discovery
                    </p>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-8 leading-tight animate-fade-in-up delay-100">
                        True Personality <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600">
                            Revealed by Data
                        </span>
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-12 animate-fade-in-up delay-200">
                        世界で最も信頼される心理学モデル「ビッグファイブ」に基づき、<br className="hidden md:block" />
                        あなたの才能、適職、そして幸福の条件を科学的に分析します。
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up delay-300">
                        <button
                            onClick={() => document.getElementById('selection')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-10 py-4 bg-gray-900 text-white font-serif tracking-widest hover:bg-black transition shadow-2xl text-sm w-64"
                        >
                            START ASSESSMENT
                        </button>
                        <button
                            onClick={() => document.getElementById('science')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-10 py-4 bg-white text-gray-800 border border-gray-200 font-serif tracking-widest hover:bg-gray-50 transition shadow-sm text-sm w-64"
                        >
                            READ THE SCIENCE
                        </button>
                    </div>
                </div>
            </section>

            {/* Science Section */}
            <section id="science" className="py-24 px-4 bg-white relative">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="w-16 h-1 bg-yellow-500 block mb-8"></span>
                            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
                                Why Big Five?
                            </h2>
                            <p className="text-gray-600 leading-loose mb-6 font-light">
                                心理学の世界では、かつてのような「血液型」や「直感的なタイプ論」は過去のものとなりました。現在、世界中の研究機関や企業の人事部門で採用されている唯一のスタンダード、それが<strong className="text-gray-900 font-medium">「ビッグファイブ（The Big Five）」</strong>です。
                            </p>
                            <p className="text-gray-600 leading-loose mb-6 font-light">
                                人間の性格を5つの次元（開放性、誠実性、外向性、協調性、神経症傾向）で測定するこの手法は、遺伝学や脳科学の裏付けを持ち、個人の<strong className="text-gray-900 font-medium">年収、健康寿命、パートナーシップの成功率</strong>などを統計的に予測できることが証明されています。
                            </p>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-yellow-100 transform rotate-3 rounded-3xl z-0"></div>
                            <div className="relative bg-[#FAFAF9] p-8 rounded-3xl border border-gray-100 shadow-xl z-10">
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <span className="text-yellow-500 text-xl mr-4">01.</span>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Evidence Based</h4>
                                            <p className="text-sm text-gray-500">数十万人のデータに基づく統計的信頼性（エビデンス）があります。</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-yellow-500 text-xl mr-4">02.</span>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Global Standard</h4>
                                            <p className="text-sm text-gray-500">Google等の先進企業や、医療現場でも採用されています。</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-yellow-500 text-xl mr-4">03.</span>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Unbiased</h4>
                                            <p className="text-sm text-gray-500">「良い/悪い」ではなく「特性」として客観的に捉えます。</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Latest Columns Section */}
            <section className="py-24 px-4 bg-gray-50 border-t border-gray-100">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-yellow-600 font-bold tracking-widest uppercase text-xs mb-2 block">Science & Columns</span>
                            <h2 className="text-4xl font-serif font-bold text-gray-900">Latest Insights</h2>
                        </div>
                        <Link href="/blog" className="hidden md:inline-flex items-center text-sm font-bold text-gray-900 border-b-2 border-yellow-500 pb-1 hover:text-yellow-700 transition-colors">
                            View All Articles →
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {BLOG_POSTS.slice(0, 3).map((post) => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-[10px] font-bold text-yellow-700 bg-yellow-50 px-2 py-1 rounded uppercase tracking-wider">
                                            {post.category}
                                        </span>
                                        <span className="text-xs text-gray-400 ml-auto">
                                            {post.publishedAt}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-serif font-bold text-gray-900 mb-2 group-hover:text-yellow-700 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-8 text-center md:hidden">
                        <Link href="/blog" className="inline-block text-sm font-bold text-gray-900 border-b-2 border-yellow-500 pb-1">
                            View All Articles →
                        </Link>
                    </div>
                </div>
            </section>


            {/* Selection Section */}
            <section id="selection" className="py-24 px-4 bg-[#FAFAF9]">
                <div className="max-w-6xl mx-auto text-center mb-16">
                    <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Select Your Assessment</h2>
                    <p className="text-gray-500 font-light">目的に合わせて、2つの診断モードをご用意しました。</p>
                </div>

                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

                    {/* Option 1: Classic */}
                    <div className="group bg-white p-10 rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden flex flex-col">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 group-hover:bg-green-500 transition-colors"></div>
                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Basic Insight</h3>
                        <p className="text-xs font-bold text-green-600 tracking-widest uppercase mb-6">IPIP-50 / 50 Questions</p>

                        <p className="text-gray-600 mb-8 flex-1 leading-relaxed text-sm">
                            まずは自分の大まかな傾向を知りたい方向け。<br />
                            5つの主要因子のスコアを素早く算出し、あなたの基本的な性格タイプ（SLOANコード）を特定します。
                        </p>

                        <div className="space-y-4 mb-8 text-sm text-gray-500">
                            <div className="flex items-center"><span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs mr-3">⏱</span> 所要時間: 約 3-5 分</div>
                            <div className="flex items-center"><span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs mr-3">📊</span> 5項目の基本スコア</div>
                        </div>

                        <button
                            onClick={() => onSelectMode('CLASSIC')}
                            className="w-full py-4 border border-gray-200 text-gray-800 font-bold hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition"
                        >
                            START BASIC (50問)
                        </button>
                    </div>

                    {/* Option 2: NEO (Premium) */}
                    <div className="group bg-white p-10 rounded-2xl border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden flex flex-col transform md:-translate-y-4 ring-1 ring-yellow-500/20">
                        <div className="absolute top-0 right-0 bg-yellow-500 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider">Recommended</div>
                        <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500"></div>

                        <h3 className="text-3xl font-serif font-bold text-gray-900 mb-2">Deep Analysis</h3>
                        <p className="text-xs font-bold text-yellow-600 tracking-widest uppercase mb-6">IPIP-NEO-120 / 120 Questions</p>

                        <p className="text-gray-600 mb-8 flex-1 leading-relaxed text-sm">
                            プロフェッショナルな自己分析を求める方向け。<br />
                            5因子をさらに「30の側面」に分解し、あなたの深層心理、強み、リスク、行動傾向までを詳細に解剖します。
                        </p>

                        <div className="space-y-4 mb-8 text-sm text-gray-500">
                            <div className="flex items-center"><span className="w-5 h-5 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-xs mr-3">⏱</span> 所要時間: 約 10-15 分</div>
                            <div className="flex items-center"><span className="w-5 h-5 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-xs mr-3">💎</span> 30項目の詳細ファセット分析</div>
                            <div className="flex items-center"><span className="w-5 h-5 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-xs mr-3">🔮</span> 行動予測・詳細アドバイス</div>
                        </div>

                        <button
                            onClick={() => onSelectMode('NEO')}
                            className="w-full py-4 bg-gray-900 text-white font-bold hover:bg-black transition shadow-lg"
                        >
                            START PREMIUM (120問)
                        </button>
                    </div>

                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-50 py-12 text-center border-t border-gray-100">
                <p className="text-gray-400 text-xs font-serif tracking-widest uppercase">Executive Personality Assessment System</p>
                <p className="text-gray-300 text-[10px] mt-2">Based on IPIP-NEO / Scientific use only</p>
            </footer>

        </div >
    );
}
