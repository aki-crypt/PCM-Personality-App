'use client';

import React, { useState } from 'react';
import { questionsNeo, QuestionNeo, Facet } from '../data/questions_neo';
import { getSloanType } from '../data/sloan';
import { getTopAdvice } from '../utils/adviceUtils';
import { getPredictions } from '../data/predictions';
import { getRelationshipAdvice } from '../data/compatibility';
import { getManagementAdvice } from '../data/managementAdvice';
import { BLOG_POSTS } from '../data/blogPosts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Link from 'next/link';

const OPTIONS = [
    { value: 1, label: '全く当てはまらない' },
    { value: 2, label: 'あまり当てはまらない' },
    { value: 3, label: 'どちらともいえない' },
    { value: 4, label: 'やや当てはまる' },
    { value: 5, label: '非常によく当てはまる' },
];

export default function QuizNeo() {
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [showResult, setShowResult] = useState(false);
    const [resultData, setResultData] = useState<any>(null);

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleOptionChange = (qId: number, value: number) => {
        setAnswers((prev) => ({ ...prev, [qId]: value }));
    };

    const calculateScores = () => {
        // 1. Calculate Facet Scores
        const facetScores: Record<Facet, number> = {} as any;
        const facetCounts: Record<Facet, number> = {} as any;

        questionsNeo.forEach((q) => {
            const answer = answers[q.id];
            if (answer) {
                let score = answer;
                if (q.key === '-') {
                    score = 6 - answer;
                }

                if (!facetScores[q.facet]) {
                    facetScores[q.facet] = 0;
                    facetCounts[q.facet] = 0;
                }
                facetScores[q.facet] += score;
                facetCounts[q.facet] += 1;
            }
        });

        // Normalize Facets (0-100)
        // Score range is 1-5 per question.
        // Formula: ((Score - Count) / (Count * 4)) * 100
        // Min: (1*N - N) / 4N = 0.
        // Mid: (3*N - N) / 4N = 2/4 = 0.5 (50%).
        const normalizedFacets: Record<string, number> = {};
        Object.keys(facetScores).forEach(key => {
            const count = facetCounts[key as Facet];
            const sum = facetScores[key as Facet];
            if (count > 0) {
                normalizedFacets[key] = Math.round(((sum - count) / (count * 4)) * 100);
            } else {
                normalizedFacets[key] = 0;
            }
        });

        // 2. Calculate Domain Scores (Average of facets)
        const domainScores = { E: 0, A: 0, C: 0, N: 0, O: 0 };
        const domains = ['E', 'A', 'C', 'N', 'O'];

        domains.forEach(d => {
            const facets = Object.keys(normalizedFacets).filter(k => k.startsWith(d));
            const sum = facets.reduce((acc, f) => acc + normalizedFacets[f], 0);
            domainScores[d as keyof typeof domainScores] = Math.round(sum / facets.length);
        });

        return { domainScores, facetScores: normalizedFacets };
    };

    const handleFinish = () => {
        if (!questionsNeo.every((q) => answers[q.id] !== undefined)) {
            alert(`未回答の質問があります。残り ${questionsNeo.length - Object.keys(answers).length} 問`);
            return;
        }
        const { domainScores, facetScores } = calculateScores();
        const sloan = getSloanType(domainScores);
        const predictions = getPredictions(domainScores);
        setResultData({ scores: domainScores, facets: facetScores, sloan, predictions });
        setShowResult(true);
    };

    if (showResult && resultData) {
        const { scores, facets, sloan, predictions } = resultData;
        const topAdvice = getTopAdvice(facets, FACET_LABELS);
        // predictions is already destructured
        const relationship = getRelationshipAdvice(scores);

        const handleDownloadPDF = async () => {
            const element = document.getElementById('result-container');
            if (!element) return;

            try {
                // Wait for a moment to ensure styles are applied (just in case)
                await new Promise(r => setTimeout(r, 500));

                const canvas = await html2canvas(element, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    allowTaint: true,
                    backgroundColor: '#FAFAF9' // Match background
                });

                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save(`personality-report-${sloan.code}.pdf`);
            } catch (err) {
                console.error(err);
                alert("PDF生成に失敗しました: " + (err instanceof Error ? err.message : String(err)));
            }
        };

        return (
            <div id="result-container" className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 font-sans bg-[#FAFAF9]">

                {/* Header Section */}
                <div className="text-center mb-16 relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-200 opacity-20 blur-3xl rounded-full z-0"></div>
                    <div className="relative z-10">
                        <p className="text-sm tracking-[0.2em] font-bold text-gray-500 uppercase mb-4 font-serif">Executive Personality Assessment</p>
                        <h1 className="text-6xl font-serif font-bold text-gray-900 mb-6">{sloan.code}</h1>
                        <h2 className="text-3xl font-light text-gray-700 font-serif border-b-2 border-yellow-500 inline-block pb-2 px-8">{sloan.title}</h2>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Main Content (Left) */}
                    <div className="lg:col-span-7 space-y-12">

                        {/* Description */}
                        <section className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-6 flex items-center">
                                <span className="w-1 h-6 bg-yellow-500 mr-3"></span>
                                今後の可能性 (Executive Summary)
                            </h3>
                            <div className="space-y-4 text-gray-600 leading-loose text-justify font-light">
                                {sloan.description.map((line: string, i: number) => (
                                    <p key={i} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 font-medium">$1</strong>') }} />
                                ))}
                            </div>
                        </section>

                        {/* Communication Advice */}
                        <section className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-6 flex items-center">
                                <span className="w-1 h-6 bg-blue-900 mr-3"></span>
                                コミュニケーション戦略
                            </h3>

                            <div className="grid sm:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-4 border-b border-blue-100 pb-2">強み (Strengths)</h4>
                                    <ul className="space-y-3">
                                        {sloan.communicationAdvice.strength.map((s: string, i: number) => (
                                            <li key={i} className="flex items-start text-sm text-gray-600">
                                                <span className="text-blue-500 mr-2">✓</span> {s}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-red-800 uppercase tracking-widest mb-4 border-b border-red-100 pb-2">注意点 (Risk Factors)</h4>
                                    <ul className="space-y-3">
                                        {sloan.communicationAdvice.weakness.map((w: string, i: number) => (
                                            <li key={i} className="flex items-start text-sm text-gray-600">
                                                <span className="text-red-400 mr-2">⚠</span> {w}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-100">
                                <h4 className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-3">アクションプラン</h4>
                                <ul className="grid gap-3">
                                    {sloan.communicationAdvice.tips.map((t: string, i: number) => (
                                        <li key={i} className="flex items-start text-sm text-blue-800 italic">
                                            <span className="mr-2">💡</span> {t}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* Behavioral Predictions */}
                        <section className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-full -z-0"></div>
                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-6 flex items-center relative z-10">
                                <span className="w-1 h-6 bg-purple-900 mr-3"></span>
                                統計的傾向（予後予測）
                            </h3>
                            <div className="grid gap-4 sm:grid-cols-2 relative z-10">
                                {predictions?.map((pred: any) => (
                                    <div key={pred.id} className="bg-gray-50 p-5 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-[10px] font-bold text-white bg-purple-900 tracking-widest uppercase px-2 py-1 rounded">
                                                {pred.category}
                                            </span>
                                            <span className="text-xs text-purple-900 font-bold ml-auto">
                                                Lv.{pred.score}
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-gray-900 text-sm mb-2">{pred.title}</h4>
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                            {pred.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>


                        {/* Partner Compatibility (New) */}
                        <section className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-6 flex items-center">
                                <span className="w-1 h-6 bg-pink-500 mr-3"></span>
                                理想のパートナー像
                            </h3>

                            <div className="bg-pink-50 p-6 rounded-xl border border-pink-100 mb-8 text-center">
                                <span className="text-xs font-bold text-pink-500 tracking-widest uppercase mb-2 block">Best Match</span>
                                <div className="text-4xl mb-4 text-pink-500">{relationship.idealPartnerIcon}</div>
                                <h4 className="text-2xl font-serif font-bold text-gray-900 mb-3">{relationship.idealPartnerType}</h4>
                                <p className="text-sm text-gray-600 leading-relaxed font-light italic">"{relationship.idealPartnerDescription}"</p>
                            </div>

                            <div className="mb-6 invisible-scrollbar">
                                <p className="text-sm text-gray-600 leading-relaxed mb-4 font-bold border-b border-gray-100 pb-2">
                                    具体的な特徴
                                </p>
                                <div className="grid gap-4">
                                    {relationship.idealPartnerTraits.map((t, i) => (
                                        <div key={i} className="flex items-start p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                                            <span className="text-pink-400 text-lg mr-3 mt-0.5">♥</span>
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-xs mb-1">{t.trait}</h4>
                                                <p className="text-[10px] text-gray-500 leading-relaxed">{t.reason}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {relationship.warning && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-lg text-xs text-gray-500 italic border-l-4 border-gray-300">
                                    {relationship.warning}
                                </div>
                            )}
                        </section>

                        {/* Management Advice (For Managers) - NEW */}
                        <section className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-6 flex items-center">
                                <span className="w-1 h-6 bg-indigo-900 mr-3"></span>
                                マネジメント・リーダーシップ分析 (For Managers)
                            </h3>
                            <p className="text-sm text-gray-500 mb-8">
                                あなたが管理職・リーダーの立場でチームを率いる際に、自分の性格特性がどのように影響するか（バイアス）と、異なるタイプの部下をどう扱うべきかのアドバイスです。
                            </p>

                            <div className="space-y-12">
                                {getManagementAdvice(scores).map((advice, i) => (
                                    <div key={i} className="border-b border-gray-100 last:border-0 pb-12 last:pb-0">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className={`text-[10px] font-bold text-white px-2 py-1 rounded uppercase tracking-widest
                                                ${advice.trait === 'N' ? 'bg-gray-500' :
                                                    advice.trait === 'E' ? 'bg-blue-600' :
                                                        advice.trait === 'O' ? 'bg-purple-600' :
                                                            advice.trait === 'A' ? 'bg-green-600' :
                                                                'bg-yellow-500'}`}>
                                                {advice.trait} - {advice.value}
                                            </span>
                                            <h4 className="font-serif font-bold text-lg text-gray-900">{advice.title}</h4>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-6 leading-relaxed bg-gray-50 p-4 rounded-lg">
                                            {advice.description}
                                        </p>

                                        {/* Warning */}
                                        <div className="mb-6">
                                            <h5 className="text-xs font-bold text-red-600 uppercase tracking-widest mb-2 flex items-center">
                                                <span className="text-lg mr-2">⚠️</span>
                                                リーダーとしての「落とし穴」 (Bias Warning)
                                            </h5>
                                            <div className="pl-4 border-l-2 border-red-100">
                                                <p className="font-bold text-sm text-gray-800 mb-1">{advice.biasWarning.title}</p>
                                                <p className="text-xs text-gray-600 mb-2 leading-relaxed">{advice.biasWarning.description}</p>
                                                <div className="flex items-start bg-red-50 p-3 rounded text-xs text-red-800 font-medium">
                                                    <span className="text-red-500 mr-2 font-bold">対策:</span>
                                                    {advice.biasWarning.countermeasure}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Subordinate Handling */}
                                        <div>
                                            <h5 className="text-xs font-bold text-indigo-900 uppercase tracking-widest mb-3 flex items-center">
                                                <span className="text-lg mr-2">👥</span>
                                                部下のタイプ別・取扱説明書
                                            </h5>
                                            <div className="grid gap-4">
                                                {advice.subordinateHandling.map((sub, j) => (
                                                    <div key={j} className="bg-indigo-50/50 p-4 rounded-lg border border-indigo-100">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                                                                Target: {sub.targetType}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-gray-600 mb-2">
                                                            <span className="font-bold text-gray-800">リスク:</span> {sub.risk}
                                                        </p>
                                                        <p className="text-xs text-gray-600 mb-3">
                                                            <span className="font-bold text-gray-800">戦略:</span> {sub.strategy}
                                                        </p>
                                                        <div className="bg-white p-3 rounded border border-indigo-100 flex items-start">
                                                            <span className="text-lg mr-2">💬</span>
                                                            <div>
                                                                <span className="text-[10px] text-gray-400 block uppercase tracking-wide mb-0.5">Magic Phrase</span>
                                                                <p className="text-sm font-serif font-bold text-indigo-900 italic">
                                                                    "{sub.magicPhrase}"
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Recommended Articles (New) */}
                        <section className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-50 rounded-br-full -z-0"></div>
                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-6 flex items-center relative z-10">
                                <span className="w-1 h-6 bg-yellow-500 mr-3"></span>
                                あなたにおすすめのコラム
                            </h3>
                            <div className="grid gap-4 sm:grid-cols-2 relative z-10">
                                {BLOG_POSTS.filter(post => {
                                    if (!post.relatedTraits) return false;
                                    return post.relatedTraits.some(t => {
                                        const score = scores[t.trait];
                                        if (t.value === 'High') return score >= 60;
                                        if (t.value === 'Low') return score <= 40;
                                        return false;
                                    });
                                }).slice(0, 4).map((post) => ( // Show top 4 matches
                                    <Link key={post.id} href={`/blog/${post.slug}`} target="_blank" className="bg-yellow-50/50 p-5 rounded-lg border border-yellow-100 hover:bg-yellow-50 hover:shadow-md transition-all group">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-[10px] font-bold text-yellow-800 bg-yellow-100 px-2 py-1 rounded uppercase">
                                                {post.category}
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-yellow-800 transition-colors">
                                            {post.title} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                                        </h4>
                                        <p className="text-xs text-gray-600 leading-snug line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </section>

                    </div>

                    {/* Sidebar (Right) */}

                    {/* Sidebar (Right) */}
                    <div className="lg:col-span-5 space-y-8">

                        {/* Detailed Facets */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">
                                構成要素の詳細（ファセット）
                            </h3>
                            <div className="space-y-10">
                                <FacetGroup title="Extraversion (外向性)" code={sloan.code[0]} score={scores.E} facets={facets} prefix="E" color="blue" />
                                <FacetGroup title="Neuroticism (神経症的傾向)" code={sloan.code[1]} score={scores.N} facets={facets} prefix="N" color="gray" />
                                <FacetGroup title="Conscientiousness (誠実性)" code={sloan.code[2]} score={scores.C} facets={facets} prefix="C" color="yellow" />
                                <FacetGroup title="Agreeableness (協調性)" code={sloan.code[3]} score={scores.A} facets={facets} prefix="A" color="green" />
                                <FacetGroup title="Openness (開放性)" code={sloan.code[4]} score={scores.O} facets={facets} prefix="O" color="purple" />
                            </div>
                        </div>

                        {/* Top Advice (Highlights) */}
                        {topAdvice.length > 0 && (
                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-20 -mt-20 blur-2xl"></div>
                                <h3 className="text-xl font-serif font-bold text-gold mb-6 relative z-10">重要なインサイト</h3>
                                <div className="space-y-6 relative z-10">
                                    {topAdvice.map((advice, i) => (
                                        <div key={i} className="">
                                            <h4 className="font-bold text-sm text-gray-200 mb-1 flex justify-between items-center">
                                                <span>{advice.facetName} : {advice.title}</span>
                                                <span className="bg-white/10 px-2 py-0.5 rounded textxs">{advice.score}%</span>
                                            </h4>
                                            <p className="text-xs text-gray-400 mb-2 font-light">{advice.desc}</p>
                                            <p className="text-xs text-gold italic border-l-2 border-gold pl-3">
                                                "{advice.tip}"
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Careers */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">おすすめのキャリア</h3>
                            <div className="flex flex-wrap gap-2">
                                {sloan.careers.map((c: string, i: number) => (
                                    <span key={i} className="px-3 py-1 bg-gray-50 text-gray-700 text-xs font-medium uppercase tracking-wider border border-gray-200">{c}</span>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                <div className="mt-16 text-center space-x-4">
                    <button
                        onClick={() => {
                            setAnswers({});
                            setShowResult(false);
                            setResultData(null);
                            window.scrollTo(0, 0);
                        }}
                        className="px-8 py-3 bg-gray-900 text-white font-serif tracking-widest hover:bg-black transition shadow-lg text-sm"
                    >
                        RETAKE ASSESSMENT
                    </button>
                    <button
                        onClick={handleDownloadPDF}
                        className="px-8 py-3 bg-white text-gray-900 border border-gray-200 font-serif tracking-widest hover:bg-gray-50 transition shadow-lg text-sm"
                    >
                        DOWNLOAD PDF
                    </button>
                </div>
            </div >
        );
    }

    const remaining = questionsNeo.length - Object.keys(answers).length;
    const progressPercent = (Object.keys(answers).length / questionsNeo.length) * 100;

    return (
        <div className="min-h-screen bg-[#FAFAF9] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl space-y-8">

                {/* Header */}
                <div className="text-center">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mb-2 font-serif">Deep Analysis</p>
                    <h1 className="text-4xl font-serif font-bold text-gray-900">IPIP-NEO-120</h1>
                    <div className="mt-4 w-24 h-1 bg-yellow-500 mx-auto"></div>
                </div>

                {/* Legend for Scale */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
                    <p className="text-sm text-gray-500 mb-4 font-medium">以下の質問に対して、最も当てはまる番号を選んでください</p>
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-6 text-xs sm:text-sm font-bold text-gray-600">
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">1</div>
                            <span className="text-gray-400">全く違う</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">2</div>
                            <span className="text-gray-400">違う</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">3</div>
                            <span className="text-gray-400">どちらでもない</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">4</div>
                            <span className="text-gray-400">そう思う</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-900 text-white shadow-lg flex items-center justify-center mb-1">5</div>
                            <span className="text-gray-900">強くそう思う</span>
                        </div>
                    </div>
                </div>

                {/* Progress */}
                <div className="relative pt-8">
                    <div className="flex justify-between text-xs text-gray-500 font-medium tracking-wide mb-2 uppercase">
                        <span>Progress</span>
                        <span>{Object.keys(answers).length} / {questionsNeo.length}</span>
                    </div>
                    <div className="bg-gray-200 h-1 w-full rounded-full overflow-hidden">
                        <div className="bg-gray-900 h-full transition-all duration-300 ease-out" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                </div>

                {/* Questions */}
                <div className="space-y-6 mt-8">
                    {questionsNeo.map((q, index) => {
                        const isAnswered = answers[q.id] !== undefined;
                        // Only show current unanswered questions and nearby answered ones to clear clutter? 
                        // For now, let's just make the standard list look premium.
                        // maybe stick to showing all.

                        return (
                            <div key={q.id} className={`
                    bg-white relative p-8 rounded-xl border transition-all duration-300 ease-in-out
                    ${isAnswered ? 'border-gray-200 opacity-60 hover:opacity-100' : 'border-l-4 border-l-yellow-500 shadow-xl scale-100 z-10 border-t-gray-100 border-r-gray-100 border-b-gray-100'}
                 `}>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex-1">
                                        <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1 block">Question {index + 1}</span>
                                        <h3 className="text-lg font-medium text-gray-800 leading-relaxed font-serif">{q.text_ja}</h3>
                                        <p className="text-xs text-gray-400 mt-1 italic font-light">{q.text_en}</p>
                                    </div>

                                    <div className="flex gap-2">
                                        {OPTIONS.map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => handleOptionChange(q.id, opt.value)}
                                                className={`
                                        w-12 h-12 rounded-full flex items-center justify-center text-sm font-serif font-bold transition-all duration-200
                                        ${answers[q.id] === opt.value
                                                        ? 'bg-gray-900 text-white shadow-lg scale-110'
                                                        : 'bg-gray-50 text-gray-400 hover:bg-gray-200 hover:text-gray-600'}
                                    `}
                                                title={opt.label}
                                            >
                                                {opt.value}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Footer Action */}
                <div className="sticky bottom-8 text-center pt-8 pointer-events-none">
                    <div className="inline-block pointer-events-auto">
                        <button
                            onClick={handleFinish}
                            disabled={remaining > 0}
                            className={`
                        px-12 py-4 shadow-2xl rounded-sm font-bold tracking-widest uppercase text-sm transition-all duration-300
                        ${remaining === 0
                                    ? 'bg-gray-900 text-white hover:bg-black transform hover:-translate-y-1'
                                    : 'bg-white text-gray-300 border border-gray-100'}
                    `}
                        >
                            {remaining === 0 ? 'View Full Analysis' : `${remaining} QUESTIONS REMAINING`}
                        </button>
                    </div>
                </div>

                {/* Debug / Dev Tools */}
                <div className="text-center pb-8 mt-8 opacity-20 hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => {
                            const newAnswers: Record<number, number> = {};
                            questionsNeo.forEach(q => {
                                newAnswers[q.id] = Math.floor(Math.random() * 5) + 1;
                            });
                            setAnswers(newAnswers);
                            setTimeout(() => {
                                window.scrollTo(0, document.body.scrollHeight);
                            }, 100);
                        }}
                        className="text-xs text-gray-500 underline cursor-pointer"
                    >
                        [DEV] Random Fill All Answers
                    </button>
                </div>
            </div>
        </div >
    );
}

const FACET_LABELS: Record<string, string> = {
    // Neuroticism
    N1: 'Anxiety', N2: 'Anger', N3: 'Depression',
    N4: 'Self-Consciousness', N5: 'Immoderation', N6: 'Vulnerability',
    // Extraversion
    E1: 'Friendliness', E2: 'Gregariousness', E3: 'Assertiveness',
    E4: 'Activity Level', E5: 'Excitement-Seeking', E6: 'Cheerfulness',
    // Openness
    O1: 'Imagination', O2: 'Artistic Interests', O3: 'Emotionality',
    O4: 'Adventurousness', O5: 'Intellect', O6: 'Liberalism',
    // Agreeableness
    A1: 'Trust', A2: 'Morality', A3: 'Altruism',
    A4: 'Cooperation', A5: 'Modesty', A6: 'Sympathy',
    // Conscientiousness
    C1: 'Self-Efficacy', C2: 'Orderliness', C3: 'Dutifulness',
    C4: 'Achievement-Striving', C5: 'Self-Discipline', C6: 'Cautiousness'
};

function FacetGroup({ title, code, score, facets, prefix, color }: { title: string, code: string, score: number, facets: Record<string, number>, prefix: string, color: string }) {
    const facetKeys = Object.keys(FACET_LABELS).filter(k => k.startsWith(prefix));

    // Color mapping hardcoded for simplicity in this specific design
    const getColorClass = (c: string) => {
        switch (c) {
            case 'blue': return 'bg-blue-900';
            case 'gray': return 'bg-gray-500';
            case 'yellow': return 'bg-yellow-500';
            case 'green': return 'bg-green-600';
            case 'purple': return 'bg-purple-800';
            default: return 'bg-gray-900';
        }
    }

    const barColor = getColorClass(color);

    return (
        <div>
            <div className="flex justify-between items-baseline mb-3 border-b border-gray-100 pb-1">
                <h4 className="font-serif font-bold text-lg text-gray-800 tracking-tight">{title} <span className="text-gray-400 font-light ml-2">{code}</span></h4>
                <span className="font-mono text-xl font-bold text-gray-900">{score}%</span>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4 pt-2">
                {facetKeys.map(key => (
                    <FacetBar key={key} label={FACET_LABELS[key]} score={facets[key]} barColor={barColor} />
                ))}
            </div>
        </div>
    );
}

function FacetBar({ label, score, barColor }: { label: string, score: number, barColor: string }) {
    return (
        <div>
            <div className="flex justify-between mb-1 text-xs uppercase tracking-wide text-gray-500 font-medium">
                <span>{label}</span>
                <span>{score}</span>
            </div>
            <div className="w-full bg-gray-100 h-1 overflow-hidden">
                <div
                    className={`h-full ${barColor}`}
                    style={{ width: `${score}%` }}
                />
            </div>
        </div>
    );
}
