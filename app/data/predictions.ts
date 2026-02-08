export type OutcomePrediction = {
    id: string;
    category: string;
    title: string;
    description: string;
    score: number; // 1-5 scale (1=Low, 5=High)
    evidenceLevel: 'High' | 'Medium' | 'Low';
};

export function getPredictions(scores: { E: number, N: number, O: number, A: number, C: number }): OutcomePrediction[] {
    const outcomes: OutcomePrediction[] = [];

    // 1. Income Potential (Earned Income)
    // Evidence: High C (Strongest), Low N (Strong), Low A (Male-specific, but generally applicable as "negotiation power")
    let incomeScore = 3;
    if (scores.C >= 60) incomeScore += 1;
    if (scores.C >= 80) incomeScore += 1;
    if (scores.C <= 30) incomeScore -= 1;

    if (scores.N <= 40) incomeScore += 1;
    if (scores.N >= 70) incomeScore -= 1;

    // Low A generally earns more (negotiation)
    if (scores.A <= 40) incomeScore += 1;

    // Cap at 5
    incomeScore = Math.min(5, Math.max(1, incomeScore));

    outcomes.push({
        id: 'income',
        category: '生涯年収・キャリア',
        title: incomeScore >= 4 ? '高年収ポテンシャル (High Potential)' : incomeScore <= 2 ? '安定志向 / 変動型' : '平均的な収入傾向',
        description: incomeScore >= 4
            ? '高い「誠実性（勤勉さ）」と「情緒安定性」は、統計的に最も年収と強い相関があります。さらに、少しドライな交渉術（低A）もビジネスでは有利に働く傾向があります。'
            : incomeScore <= 2
                ? '金銭的な成功よりも、精神的な満足や柔軟な働き方、あるいはリスクのある挑戦を好む傾向があるかもしれません。'
                : 'バランスの取れたキャリアを歩む傾向があります。',
        score: incomeScore,
        evidenceLevel: 'High'
    });

    // 2. Health & Longevity
    // Evidence: High C (Strongest), Low N
    let healthScore = 3;
    if (scores.C >= 60) healthScore += 1;
    if (scores.N <= 40) healthScore += 1;
    if (scores.C <= 30) healthScore -= 1;
    if (scores.N >= 70) healthScore -= 1;

    healthScore = Math.min(5, Math.max(1, healthScore));

    outcomes.push({
        id: 'health',
        category: '健康・長寿',
        title: healthScore >= 4 ? '長寿傾向 (High Longevity)' : healthScore <= 2 ? '健康リスク注意' : '平均的な健康度',
        description: healthScore >= 4
            ? '「誠実性」の高さは、健康管理能力の高さ（定期検診、運動、節制）と直結し、長寿である確率が統計的に非常に高いです。'
            : healthScore <= 2
                ? 'ストレス耐性の弱さや不規則な生活習慣が、将来的な健康リスクになる可能性があります。意識的な健康管理が重要です。'
                : '一般的な健康維持能力を持っています。',
        score: healthScore,
        evidenceLevel: 'High'
    });

    // 3. Leadership Emergence
    // Evidence: High E (Strongest)
    const leadershipScore = scores.E >= 70 ? 5 : scores.E >= 50 ? 3 : 1;

    outcomes.push({
        id: 'leadership',
        category: 'リーダーシップ',
        title: leadershipScore >= 4 ? 'リーダー選出傾向 (Leader Emergence)' : 'サポーター / 専門家',
        description: leadershipScore >= 4
            ? '「外向性」の高さは、グループ内でリーダーとして選ばれやすい最強の因子です。積極的に意見を発信し、周囲を引っ張る力があります。'
            : '自分が前に出るよりも、リーダーを支えたり、専門家として実務で貢献するポジションで力を発揮するタイプです。',
        score: leadershipScore,
        evidenceLevel: 'Medium'
    });

    // 4. Academic / Intellectual Achievement
    // Evidence: High C (Grades), High O (Knowledge)
    let academicScore = 3;
    if (scores.C >= 60) academicScore += 1; // Good Grades
    if (scores.O >= 60) academicScore += 1; // Curiosity
    if (scores.C <= 30) academicScore -= 1;

    academicScore = Math.min(5, Math.max(1, academicScore));

    outcomes.push({
        id: 'academic',
        category: '学習・知的成果',
        title: academicScore >= 4 ? '高い学習適性 (High Achiever)' : '実践重視 (Street Smart)',
        description: academicScore >= 4
            ? '「誠実性（コツコツ努力）」と「開放性（知的好奇心）」の組み合わせは、学業成績や高度なスキル習得において最強の武器となります。'
            : '座学よりも、現場での実践経験や勘を通じて学ぶこと（ストリートスマート）を得意とする傾向があります。',
        score: academicScore,
        evidenceLevel: 'High'
    });

    return outcomes;
}
