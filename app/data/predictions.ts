type PredictionCategory = 'HEALTH' | 'FINANCE' | 'RELATIONSHIP' | 'CAREER' | 'ACADEMIC';

type Prediction = {
    id: string;
    category: PredictionCategory;
    title: string;
    description: string;
    condition: (scores: { E: number; A: number; C: number; N: number; O: number }) => boolean;
    probability: string; // e.g. "High", "Moderate"
    source: string; // Scientific basis summary
};

export const PREDICTIONS: Prediction[] = [
    // --- HEALTH ---
    {
        id: 'health_long_life',
        category: 'HEALTH',
        title: '長寿の可能性が高い',
        description: '誠実性が高い人は、健康管理（運動・食事・定期検診）を徹底し、衝動的なリスク行動を避ける傾向があるため、統計的に最も長生きするグループです。',
        condition: (s) => s.C >= 70,
        probability: '高',
        source: 'Friedman et al. (1993) - Conscientiousness is the strongest personality predictor of longevity.'
    },
    {
        id: 'health_stress',
        category: 'HEALTH',
        title: 'ストレス性疾患のリスク',
        description: '神経症傾向が高い場合、小さなストレスにも敏感に反応しやすいため、心血管系の負担や慢性的な疲労を感じやすい傾向があります。',
        condition: (s) => s.N >= 70,
        probability: '中～高',
        source: 'Lahey (2009) - Neuroticism link to public health significance.'
    },

    // --- FINANCE ---
    {
        id: 'finance_saving',
        category: 'FINANCE',
        title: '貯蓄上手・資産形成',
        description: '誠実性が高い人は衝動買いを控え、将来のために計画的に貯蓄する能力に長けています。年収そのものよりも「純資産」が多くなりやすい傾向があります。',
        condition: (s) => s.C >= 65,
        probability: '高',
        source: 'Nyhus & Webley (2001) - Conscientiousness impacts saving behavior.'
    },
    {
        id: 'finance_implusive',
        category: 'FINANCE',
        title: '衝動買いの傾向',
        description: '外向性が高く、かつ誠実性が低めの場合、社交や刺激的な体験にお金を使いすぎたり、クレジットカードの負債を抱えやすい傾向が強まります。',
        condition: (s) => s.E >= 60 && s.C <= 45,
        probability: '中',
        source: 'Donnelly et al. (2012) - Money management and personality.'
    },
    {
        id: 'finance_income',
        category: 'FINANCE',
        title: '高収入のポテンシャル',
        description: '誠実性が高く（勤勉）、外向性が高い（交渉・自己主張）組み合わせは、キャリアにおいて昇進や収入アップを実現しやすい最も有利な性格パターンです。',
        condition: (s) => s.C >= 60 && s.E >= 60,
        probability: '高',
        source: 'Judge et al. (1999) - Big Five relationship with career success.'
    },

    // --- ACADEMIC / LEARNING ---
    {
        id: 'academic_success',
        category: 'ACADEMIC',
        title: '高い学業成績',
        description: '知的好奇心（開放性）と、コツコツ努力する力（誠実性）の両方を持ち合わせているため、学校の成績や資格試験などで優秀な結果を出しやすいです。',
        condition: (s) => s.O >= 60 && s.C >= 60,
        probability: '高',
        source: 'Poropat (2009) - Meta-analysis of Big Five and academic performance.'
    },

    // --- RELATIONSHIP ---
    {
        id: 'rel_stability',
        category: 'RELATIONSHIP',
        title: '安定したパートナーシップ',
        description: '協調性が高く誠実な人は、パートナーとの約束を守り、喧嘩になっても修復しようと努めるため、離婚率が低く関係が長続きします。',
        condition: (s) => s.A >= 60 && s.C >= 50 && s.N <= 50,
        probability: '高',
        source: 'Solomon & Jackson (2014) - Personality and marital satisfaction.'
    },
    {
        id: 'rel_drama',
        category: 'RELATIONSHIP',
        title: 'ドラマチックな恋愛',
        description: '神経症傾向が高く外向的な場合、感情の起伏が激しく、情熱的だが不安定な恋愛を繰り返す傾向があります。',
        condition: (s) => s.N >= 65 && s.E >= 60,
        probability: '中',
        source: 'Neyer & Voigt (2004).'
    },

    // --- CAREER / WORK_STYLE ---
    {
        id: 'career_entrepreneur',
        category: 'CAREER',
        title: '起業家精神',
        description: '開放性が高く（新しいアイデア）、誠実性が高く（実行力）、外向性が高い（人を巻き込む）人は、起業家として成功する典型的な性格プロファイルを持っています。',
        condition: (s) => s.O >= 70 && s.C >= 60 && s.E >= 60,
        probability: '中～高',
        source: 'Zhao & Seibert (2006).'
    },
    {
        id: 'career_specialist',
        category: 'CAREER',
        title: '職人・専門家タイプ',
        description: '内向的だが特定の分野への関心（開放性）が高く、勤勉（誠実性）なあなたは、組織の管理職よりも、特定のスキルを極めるスペシャリストとして大成します。',
        condition: (s) => s.E <= 45 && s.O >= 60 && s.C >= 60,
        probability: '高',
        source: '-'
    }
];

export function getPredictions(scores: { E: number; A: number; C: number; N: number; O: number }) {
    return PREDICTIONS.filter(p => p.condition(scores));
}
