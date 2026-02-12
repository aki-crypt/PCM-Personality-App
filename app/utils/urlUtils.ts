export function encodeAnswers(answers: Record<number, number>, count: number): string {
    let result = '';
    for (let i = 1; i <= count; i++) {
        const val = answers[i];
        if (val === undefined) {
            return ''; // Invalid/Incomplete
        }
        result += val.toString();
    }
    return result;
}

export function decodeAnswers(encoded: string, count: number): Record<number, number> | null {
    if (!encoded || encoded.length !== count) {
        return null;
    }
    const answers: Record<number, number> = {};
    for (let i = 0; i < count; i++) {
        const val = parseInt(encoded[i]);
        if (isNaN(val) || val < 1 || val > 5) {
            return null;
        }
        answers[i + 1] = val;
    }
    return answers;
}
