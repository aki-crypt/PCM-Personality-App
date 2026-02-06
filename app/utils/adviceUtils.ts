import { Facet } from '../data/questions_neo';
import { FACET_ADVICE } from '../data/advice_neo';

// Logic to find top 3 extreme facets
export function getTopAdvice(facets: Record<string, number>, facetLabels: Record<string, string>) {
    const sortedDetails = Object.entries(facets)
        .map(([key, score]) => {
            const dist = Math.abs(score - 50);
            return { key, score, dist };
        })
        .sort((a, b) => b.dist - a.dist)
        .slice(0, 3); // Top 3

    return sortedDetails.map(item => {
        const facetKey = item.key as Facet;
        const isHigh = item.score >= 50;
        const advice = FACET_ADVICE[facetKey];
        return {
            title: isHigh ? advice.high.label : advice.low.label,
            desc: isHigh ? advice.high.desc : advice.low.desc,
            tip: isHigh ? advice.high.tip : advice.low.tip,
            facetName: facetLabels[facetKey] || facetKey,
            score: item.score
        };
    });
}
