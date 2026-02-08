import { SLOAN_TYPES } from './sloan';

export type PartnerTrait = {
    trait: string;
    reason: string;
    type: 'SIMILAR' | 'COMPLEMENTARY';
};

export type RelationshipAdvice = {
    idealPartnerTraits: PartnerTrait[];
    advice: string;
    warning: string;
    idealPartnerType: string;
    idealPartnerDescription: string;
    idealPartnerIcon: string;
};

// Define Partner Archetypes based on Big Five clusters
// (Deprecated but keeping structure if needed for reference, though new logic uses SLOAN_TYPES)

export function getRelationshipAdvice(scores: { E: number, A: number, C: number, N: number, O: number }): RelationshipAdvice {
    const traits: PartnerTrait[] = [];

    // Logic for traits (same as before)
    if (scores.A < 50) {
        traits.push({ trait: "協調性が高く、温厚な人（高A）", reason: "あなたの率直すぎる意見も、感情的に受け取らず流してくれます。", type: 'COMPLEMENTARY' });
    } else {
        traits.push({ trait: "思いやりがあり、感謝を表現できる人（高A）", reason: "お互いに譲り合い、温かい家庭を築けます。", type: 'SIMILAR' });
    }
    if (scores.C >= 60) {
        traits.push({ trait: "計画的で、約束をしっかり守る人（高C）", reason: "価値観が合い、ストレスなく共同生活を送れます。", type: 'SIMILAR' });
    } else if (scores.C <= 40) {
        traits.push({ trait: "おおらかで、細かいことを気にしない人（低C）", reason: "束縛のない自由な関係を楽しめます。", type: 'SIMILAR' });
    } else {
        traits.push({ trait: "ある程度の責任感を持ちつつ、柔軟な人", reason: "（中程度の誠実性）", type: 'COMPLEMENTARY' });
    }
    if (scores.O >= 60) {
        traits.push({ trait: "知的好奇心が旺盛で、会話の引き出しが多い人（高O）", reason: "新しい体験や議論を共有でき、飽きません。", type: 'SIMILAR' });
    } else if (scores.O <= 40) {
        traits.push({ trait: "現実的で、伝統的な価値観を大切にする人（低O）", reason: "共通の生活基盤や習慣を大切にし、安定した生活を築けます。", type: 'SIMILAR' });
    }
    if (scores.N >= 60) {
        traits.push({ trait: "情緒が安定していて、動じない人（低N）", reason: "あなたの不安や感情の起伏を受け止めてくれる「安全基地」となります。", type: 'COMPLEMENTARY' });
    } else {
        traits.push({ trait: "精神的に自立しており、依存してこない人（低〜中N）", reason: "対等なパートナーシップを築けます。", type: 'SIMILAR' });
    }
    if (scores.E >= 65) {
        traits.push({ trait: "聞き上手で、あなたを立ててくれる人（低Eまたは高A）", reason: "あなたがリードし、相手がそれを楽しんでくれる関係がスムーズです。", type: 'COMPLEMENTARY' });
    } else if (scores.E <= 35) {
        traits.push({ trait: "社交的で、あなたを外の世界に連れ出してくれる人（高E）", reason: "自分ひとりでは経験できない新しい世界を見せてくれます。", type: 'COMPLEMENTARY' });
    }

    // Determine Ideal Partner SLOAN Code
    // Rule: Based on scientific evidence (Assortative Mating), Similarity is generally better for stability.
    // E (Social): Similarity (High E likes High E, Low E likes Low E)
    // N (calm): Always C (Calm) is best (Partner Effect)
    // C (Order): Similarity (Lifestyle match)
    // A (Agreeable): Always A (Accommodating) is best (Partner Effect)
    // O (Inquisitive): Similarity (Values match)

    const idealE = (scores.E >= 50) ? 'S' : 'R'; // Similarity
    const idealN = 'C';
    const idealC = (scores.C >= 50) ? 'O' : 'U';
    const idealA = 'A';
    const idealO = (scores.O >= 50) ? 'I' : 'N';

    const idealCode = idealE + idealN + idealC + idealA + idealO;
    const definitions = SLOAN_TYPES[idealCode] || { title: 'Unknown', jaTitle: '理想的なパートナー', icon: '✨' };

    const idealPartnerType = `${definitions.jaTitle} (${definitions.title})`;
    const idealPartnerDescription = `価値観（${idealO === 'I' ? '知的好奇心' : '現実的'}）と生活スタイル（${idealC === 'O' ? '几帳面' : '柔軟'}）が合い、${idealN === 'C' ? '精神的に安定した' : ''}相手が、あなたにとって最高のパートナーです。`;

    // Generate Advice Text
    let advice = "基本的には「価値観（開放性）」が似ていて、「生活スタイル（誠実性）」が合う人が長続きします。";
    let warning = "";
    if (scores.N >= 60) {
        warning = "注意：あなたは感情が揺れ動きやすいため、同じように感情的な相手とは衝突が増える可能性があります。";
    } else if (scores.A <= 40) {
        warning = "注意：あなたの批判的な言動が、繊細なパートナーを傷つける可能性があります。意識的な感謝の表現が必要です。";
    }

    return {
        idealPartnerTraits: traits.slice(0, 3), // Top 3 recommendation
        advice,
        warning,
        idealPartnerType,
        idealPartnerDescription,
        idealPartnerIcon: definitions.icon
    };
}
