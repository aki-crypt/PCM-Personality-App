'use client';

import React, { useState } from 'react';
import { questions, Question } from '../data/questions';
import { getSloanType } from '../data/sloan';
import { getPredictions } from '../data/predictions';
import { getRelationshipAdvice } from '../data/compatibility';
import html2canvas from 'html2canvas';

import jsPDF from 'jspdf';

const OPTIONS = [
    { value: 1, label: '全く当てはまらない' },
    { value: 2, label: 'あまり当てはまらない' },
    { value: 3, label: 'どちらともいえない' },
    { value: 4, label: 'やや当てはまる' },
    { value: 5, label: '非常によく当てはまる' },
];

export default function QuizClassic() {
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

    const handleFinish = () => {
        if (!questions.every((q) => answers[q.id] !== undefined)) {
            alert(`未回答の質問があります。残り ${questions.length - Object.keys(answers).length} 問`);
            return;
        }
        const domainScores = calculateScores();
        const sloan = getSloanType(domainScores);
        const predictions = getPredictions(domainScores);
        setResultData({ scores: domainScores, sloan, predictions });
        setShowResult(true);
    };

    if (showResult && resultData) {
        const { scores, sloan, predictions } = resultData;
        const relationship = getRelationshipAdvice(scores);

        const handleDownloadPDF = async () => {
            const element = document.getElementById('result-container');
            if (!element) return;

            try {
                await new Promise(r => setTimeout(r, 500));
                const canvas = await html2canvas(element, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    allowTaint: true,
                    backgroundColor: '#FAFAF9'
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

                        {/* Behavioral Predictions */}
                        <section className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-full -z-0"></div>
                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-6 flex items-center relative z-10">
                                <span className="w-1 h-6 bg-purple-900 mr-3"></span>
                                統計的傾向（予後予測）
                            </h3>
                            <div className="grid gap-4 sm:grid-cols-2 relative z-10">
                                {predictions.map((pred: any) => (
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

                        {/* Partner Compatibility (Classic) */}
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

                            <div className="grid gap-4">
                                {relationship.idealPartnerTraits.map((t, i) => (
                                    <div key={i} className="flex items-start bg-pink-50/50 p-4 rounded-lg border border-pink-100">
                                        <span className="text-pink-500 text-lg mr-3">♥</span>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm mb-1">{t.trait}</h4>
                                            <p className="text-xs text-gray-600">{t.reason}</p>
                                        </div>
                                    </div>
                                ))}
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
                            onClick={handleFinish}
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
            </div>
        </div>
    );
}
