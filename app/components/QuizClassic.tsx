'use client';

import React, { useState } from 'react';
import { questions, Question } from '../data/questions';
import { getSloanType } from '../data/sloan';
import { getPredictions } from '../data/predictions';
import { getRelationshipAdvice } from '../data/compatibility';
import { useRouter } from 'next/navigation';

const OPTIONS = [
    { value: 1, label: '全く当てはまらない' },
    { value: 2, label: 'あまり当てはまらない' },
    { value: 3, label: 'どちらともいえない' },
    { value: 4, label: 'やや当てはまる' },
    { value: 5, label: '非常によく当てはまる' },
];

import { encodeAnswers, decodeAnswers } from '../utils/urlUtils';

export default function QuizClassic({ initialData, initialAnswers }: { initialData?: any, initialAnswers?: string }) {
    const router = useRouter();
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [showResult, setShowResult] = useState(false);
    const [resultData, setResultData] = useState<any>(null);
    const [showShareToast, setShowShareToast] = useState(false);

    React.useEffect(() => {
        window.scrollTo(0, 0);
        if (initialData) {
            setResultData(initialData);
            setShowResult(true);
        } else if (initialAnswers) {
            const decoded = decodeAnswers(initialAnswers, questions.length);
            if (decoded) {
                setAnswers(decoded);
            }
        }
    }, [initialData, initialAnswers]);

    React.useEffect(() => {
        if (initialAnswers && Object.keys(answers).length === questions.length && !showResult) {
            handleFinish(true);
        }
    }, [answers, initialAnswers]);

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleOptionChange = (qId: number, value: number) => {
        setAnswers((prev) => ({ ...prev, [qId]: value }));
    };

    const calculateScores = () => {
        const scores = { E: 0, A: 0, C: 0, N: 0, O: 0 };
        const counts = { E: 0, A: 0, C: 0, N: 0, O: 0 };

        questions.forEach((q) => {
            const answer = answers[q.id];
            if (answer) {
                let score = answer;
                if (q.key === '-') {
                    score = 6 - answer;
                }
                scores[q.trait] += score;
                counts[q.trait] += 1;
            }
        });

        // Normalize to 0-100 (Score / (Count * 5) * 100)
        // Actually, calculate simpler percentage or keep standard logic?
        // Let's use the same normalization as NEO for consistency with SLOAN logic.
        const normalizedScores = { E: 0, A: 0, C: 0, N: 0, O: 0 };
        Object.keys(scores).forEach(trait => {
            const key = trait as keyof typeof scores;
            if (counts[key] > 0) {
                // Formula: ((Score - Count) / (Count * 4)) * 100
                normalizedScores[key] = Math.round(((scores[key] - counts[key]) / (counts[key] * 4)) * 100);
            }
        });

        return normalizedScores;
    };

    const handleFinish = (isRestoring: boolean = false) => {
        if (typeof isRestoring !== 'boolean') isRestoring = false;

        if (!isRestoring && !questions.every((q) => answers[q.id] !== undefined)) {
            alert('Please answer all questions');
            return;
        }

        const domainScores = calculateScores();
        const sloan = getSloanType(domainScores);
        const predictions = getPredictions(domainScores);
        // Add mode: CLASSIC
        const data = { mode: 'CLASSIC', scores: domainScores, sloan, predictions, date: new Date().toISOString() };
        setResultData(data);
        setShowResult(true);
        if (!isRestoring) {
            setTimeout(() => window.scrollTo(0, 0), 100);
        }

        try {
            localStorage.setItem('personality_app_last_result', JSON.stringify(data));
        } catch (e) {
            console.error("Failed to save result", e);
        }
    };

    const handleShare = () => {
        const encoded = encodeAnswers(answers, questions.length);
        const url = `${window.location.origin}/?share=${encoded}&mode=CLASSIC`;
        navigator.clipboard.writeText(url).then(() => {
            setShowShareToast(true);
            setTimeout(() => setShowShareToast(false), 3000);
        });
    };

    if (showResult && resultData) {
        const { scores, sloan, predictions } = resultData;
        const relationship = getRelationshipAdvice(scores);



        return (
            <div id="result-container" className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 font-sans bg-[#FAFAF9]">
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => {
                            window.location.href = '/';
                        }}
                        className="flex items-center text-gray-500 hover:text-gray-900 transition font-serif font-bold tracking-widest text-xs uppercase"
                    >
                        ← Back to Home
                    </button>
                    <button
                        onClick={handleShare}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-xs font-bold tracking-wider hover:bg-gray-800 transition"
                    >
                        🔗 結果を共有/保存
                    </button>
                </div>

                {showShareToast && (
                    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full shadow-xl z-50 animate-fade-in-up">
                        ✅ リンクをコピーしました。他の端末に送って保存できます。
                    </div>
                )}
                {/* Header Section */}
                <div className="text-center mb-16 relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-200 opacity-20 blur-3xl rounded-full z-0"></div>
                    <div className="relative z-10">
                        <p className="text-sm tracking-[0.2em] font-bold text-gray-500 uppercase mb-4 font-serif">Basic Personality Assessment</p>
                        <h1 className="text-6xl font-serif font-bold text-gray-900 mb-6">{sloan.code}</h1>
                        <h2 className="text-3xl font-light text-gray-700 font-serif border-b-2 border-green-500 inline-block pb-2 px-8">{sloan.title}</h2>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Main Content (Left) */}
                    <div className="lg:col-span-12 space-y-12">

                        {/* Description */}
                        <section className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-6 flex items-center">
                                <span className="w-1 h-6 bg-green-500 mr-3"></span>
                                性格診断レポート
                            </h3>
                            <div className="space-y-4 text-gray-600 leading-loose text-justify font-light">
                                {sloan.description.map((line: string, i: number) => (
                                    <p key={i} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 font-medium">$1</strong>') }} />
                                ))}
                            </div>
                        </section>

                        {/* Score Chart (Simple for Classic) */}
                        <section className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">
                                構成要素（スコア）
                            </h3>
                            <div className="space-y-6">
                                {Object.entries(scores).map(([trait, score]) => (
                                    <div key={trait} className="flex items-center gap-4">
                                        <span className="w-8 font-bold text-gray-700">{trait}</span>
                                        <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                                            <div className="h-full bg-gray-800" style={{ width: `${score as number}%` }}></div>
                                        </div>
                                        <span className="w-8 text-right text-gray-500 text-sm">{score as number}</span>
                                    </div>
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

                        {/* Careers */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">おすすめのキャリア</h3>
                            <div className="flex flex-wrap gap-2">
                                {sloan.careers.map((c: string, i: number) => (
                                    <span key={i} className="px-3 py-1 bg-gray-50 text-gray-700 text-xs font-medium uppercase tracking-wider border border-gray-200">{c}</span>
                                ))}
                            </div>
                        </div>

                        {/* Upsell / Link to Neo (Optional but good for differentiation) */}
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 text-center">
                            <p className="text-gray-600 mb-4 text-sm">
                                より詳細な分析（120問・30のファセット分析・将来の予測・マネジメント適性など）を知りたい場合は、<br />
                                <strong>Deep Analysis (IPIP-NEO-120)</strong> をお試しください。
                            </p>
                            <a href="/" className="inline-block px-6 py-2 bg-gray-900 text-white text-sm font-bold tracking-widest rounded hover:bg-black transition">
                                TRY DEEP ANALYSIS
                            </a>
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
                        onClick={() => {
                            setAnswers({});
                            setResultData(null);
                            router.push('/');
                        }}
                        className="px-8 py-3 bg-white text-gray-900 border border-gray-200 font-serif tracking-widest hover:bg-gray-50 transition shadow-lg text-sm"
                    >
                        BACK TO HOME
                    </button>
                </div>
            </div>
        );
    }

    const remaining = questions.length - Object.keys(answers).length;
    const progressPercent = (Object.keys(answers).length / questions.length) * 100;

    return (
        <div className="min-h-screen bg-[#FAFAF9] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl space-y-8">

                {/* Header */}
                <div className="text-center">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mb-2 font-serif">Quick Analysis</p>
                    <h1 className="text-4xl font-serif font-bold text-gray-900">Big Five (IPIP-50)</h1>
                    <div className="mt-4 w-24 h-1 bg-green-500 mx-auto"></div>
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
                        <span>{Object.keys(answers).length} / {questions.length}</span>
                    </div>
                    <div className="bg-gray-200 h-1 w-full rounded-full overflow-hidden">
                        <div className="bg-gray-900 h-full transition-all duration-300 ease-out" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                </div>

                {/* Questions */}
                <div className="space-y-6 mt-8">
                    {questions.map((q, index) => {
                        const isAnswered = answers[q.id] !== undefined;
                        return (
                            <div key={q.id} className={`
                    bg-white relative p-8 rounded-xl border transition-all duration-300 ease-in-out
                    ${isAnswered ? 'border-gray-200 opacity-60 hover:opacity-100' : 'border-l-4 border-l-green-500 shadow-xl scale-100 z-10 border-t-gray-100 border-r-gray-100 border-b-gray-100'}
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
                            onClick={() => handleFinish(false)}
                            disabled={remaining > 0}
                            className={`
                        px-12 py-4 shadow-2xl rounded-sm font-bold tracking-widest uppercase text-sm transition-all duration-300
                        ${remaining === 0
                                    ? 'bg-gray-900 text-white hover:bg-black transform hover:-translate-y-1'
                                    : 'bg-white text-gray-300 border border-gray-100'}
                    `}
                        >
                            {remaining === 0 ? 'View Analysis' : `${remaining} QUESTIONS REMAINING`}
                        </button>
                    </div>
                </div>

                {/* Debug / Dev Tools */}
                <div className="text-center pb-8 mt-8 opacity-20 hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => {
                            const newAnswers: Record<number, number> = {};
                            questions.forEach(q => {
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
        </div>
    );
}
