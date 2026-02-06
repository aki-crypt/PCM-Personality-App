'use client';

import React, { useState } from 'react';
import { questionsNeo, QuestionNeo, Facet } from '../data/questions_neo';
import { getSloanType } from '../data/sloan';
import { getTopAdvice } from '../utils/adviceUtils';
import { getPredictions } from '../data/predictions';

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
        const normalizedFacets: Record<string, number> = {};
        Object.keys(facetScores).forEach(key => {
            normalizedFacets[key] = Math.round((facetScores[key as Facet] / (facetCounts[key as Facet] * 5)) * 100);
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
        setResultData({ scores: domainScores, facets: facetScores, sloan });
        setShowResult(true);
    };

    if (showResult && resultData) {
        const { scores, facets, sloan } = resultData;
        const topAdvice = getTopAdvice(facets, FACET_LABELS);
        const predictions = getPredictions(scores);

        return (
            <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 font-sans">

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
                                Executive Summary
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
                                Communication Strategy
                            </h3>

                            <div className="grid sm:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-4 border-b border-blue-100 pb-2">Strengths</h4>
                                    <ul className="space-y-3">
                                        {sloan.communicationAdvice.strength.map((s: string, i: number) => (
                                            <li key={i} className="flex items-start text-sm text-gray-600">
                                                <span className="text-blue-500 mr-2">✓</span> {s}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-red-800 uppercase tracking-widest mb-4 border-b border-red-100 pb-2">Risk Factors</h4>
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
                                <h4 className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-3">Action Plan</h4>
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
                                Statistical Forecast (Beta)
                            </h3>
                            <div className="grid gap-4 sm:grid-cols-2 relative z-10">
                                {predictions.map((pred) => (
                                    <div key={pred.id} className="bg-gray-50 p-5 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-[10px] font-bold text-purple-900 tracking-widest uppercase border border-purple-200 px-2 py-1 rounded">
                                                {pred.category}
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-gray-900 text-sm mb-2">{pred.title}</h4>
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                            {pred.description}
                                        </p>
                                    </div>
                                ))}
                                {predictions.length === 0 && (
                                    <p className="text-gray-500 text-sm italic">特定のリスク傾向は見当たりませんでした。</p>
                                )}
                            </div>
                        </section>

                    </div>

                    {/* Sidebar (Right) */}
                    <div className="lg:col-span-5 space-y-8">

                        {/* Detailed Facets */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">
                                Trait Breakdown
                            </h3>
                            <div className="space-y-10">
                                <FacetGroup title="Extraversion" code={sloan.code[0]} score={scores.E} facets={facets} prefix="E" color="blue" />
                                <FacetGroup title="Neuroticism" code={sloan.code[1]} score={scores.N} facets={facets} prefix="N" color="gray" />
                                <FacetGroup title="Conscientiousness" code={sloan.code[2]} score={scores.C} facets={facets} prefix="C" color="yellow" />
                                <FacetGroup title="Agreeableness" code={sloan.code[3]} score={scores.A} facets={facets} prefix="A" color="green" />
                                <FacetGroup title="Openness" code={sloan.code[4]} score={scores.O} facets={facets} prefix="O" color="purple" />
                            </div>
                        </div>

                        {/* Top Advice (Highlights) */}
                        {topAdvice.length > 0 && (
                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-20 -mt-20 blur-2xl"></div>
                                <h3 className="text-xl font-serif font-bold text-gold mb-6 relative z-10">Key Insights</h3>
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
                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">Recommended Career Paths</h3>
                            <div className="flex flex-wrap gap-2">
                                {sloan.careers.map((c: string, i: number) => (
                                    <span key={i} className="px-3 py-1 bg-gray-50 text-gray-700 text-xs font-medium uppercase tracking-wider border border-gray-200">{c}</span>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                <div className="mt-16 text-center">
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
                </div>
            </div>
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
            </div>
        </div>
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
