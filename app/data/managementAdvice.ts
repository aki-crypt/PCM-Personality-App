
export type ManagementAdvice = {
    trait: 'E' | 'N' | 'A' | 'C' | 'O';
    value: 'High' | 'Low';
    title: string;
    description: string;
    biasWarning: {
        title: string;
        description: string;
        countermeasure: string;
    };
    subordinateHandling: {
        targetType: string; // e.g. "誠実性が低い部下"
        risk: string;
        strategy: string;
        magicPhrase: string;
    }[];
};

export const MANAGEMENT_ADVICE_DATA: ManagementAdvice[] = [
    // --- Extraversion (E) ---
    {
        trait: 'E',
        value: 'High',
        title: 'エネルギッシュな先導者 (The Charismatic Leader)',
        description: 'あなたは情熱的で、チームを鼓舞するのが得意です。あなたの言葉には力があり、自然と人が集まってきます。',
        biasWarning: {
            title: '「沈黙」への恐怖と、独演会バイアス',
            description: 'あなたは沈黙を「盛り上がっていない」と誤解し、会議で喋りすぎて部下の発言機会を奪いがちです。また、即興で指示を変えるため、現場が混乱している可能性があります。',
            countermeasure: '会議では意識的に「最後の5分」まで自分の意見を言わないこと。「聞き役」に徹するだけで、部下の自律性が劇的に向上します。'
        },
        subordinateHandling: [
            {
                targetType: '内向的 (Low E) な部下',
                risk: 'あなたの「熱量」に圧倒され、萎縮している。あなたが良かれと思って誘う飲み会やイベントが、彼らにとってはストレス源になっている。',
                strategy: '「その場で回答」を求めないこと。テキストや事前の議題共有を通じて、彼らが一人で考える時間を与える。',
                magicPhrase: '「今すぐ答えなくていいから、明日の夕方までに意見を聞かせてくれる？」'
            }
        ]
    },
    {
        trait: 'E',
        value: 'Low',
        title: '静かなる戦略家 (The Quiet Strategist)',
        description: 'あなたは冷静で、分析的で、部下の言葉に耳を傾けることができる「サーバント・リーダー」の素質があります。',
        biasWarning: {
            title: '「透明人間」バイアス',
            description: 'あなたの思考は深いですが、アウトプットが少なすぎます。部下は「何を考えているかわからない」「ビジョンが見えない」と不安を感じているかもしれません。',
            countermeasure: '「過剰なほど」情報を発信すること。あなたが「これくらいでいいだろう」と思う量の3倍喋って、ようやく部下に真意が伝わると心得てください。'
        },
        subordinateHandling: [
            {
                targetType: '外向的 (High E) な部下',
                risk: 'あなたのリアクションが薄いため、「評価されていないのではないか」と不安になり、モチベーションが下がっている。',
                strategy: '大げさなほど頷き、言葉で明確に称賛する。彼らの「話したい欲求」を満たす時間を定期的に設ける（1on1で雑談をする）。',
                magicPhrase: '「そのアイデア、すごく面白いね！もっと詳しく聞かせてくれる？」'
            }
        ]
    },

    // --- Agreeableness (A) ---
    {
        trait: 'A',
        value: 'High',
        title: '慈愛の守護者 (The Empathetic Guardian)',
        description: 'あなたはチームの調和を何よりも大切にします。部下はあなたに相談しやすく、職場の心理的安全性は高いでしょう。',
        biasWarning: {
            title: '「嫌われたくない」病と、優しさの罠',
            description: '部下に厳しいことを言えず、問題を先送りしていませんか？ あなたの「優しさ」は、実は「対立を避けたい」という自己防衛かもしれません。結果として、問題社員を野放しにし、優秀な社員のやる気を削いでいます。',
            countermeasure: '「明確さこそが親切である (Clear is Kind)」と唱えること。フィードバックは人格攻撃ではなく、成長のギフトです。'
        },
        subordinateHandling: [
            {
                targetType: '協調性が低い (Low A) 部下',
                risk: 'あなたの指示を「お願い」と受け取り、ナメてかかってくる可能性がある。または、彼らの攻撃的な言動をあなたが制御できず、チームが崩壊する。',
                strategy: '「感情」ではなく「論理」と「ルール」で接する。お願い口調をやめ、断定形で指示を出す。',
                magicPhrase: '「これはお願いではなく、業務命令です。期限までに完了してください。」'
            }
        ]
    },
    {
        trait: 'A',
        value: 'Low',
        title: '合理的な将軍 (The Rational General)',
        description: 'あなたは感情に流されず、事実と論理に基づいて決断できます。困難なリストラや改革を断行できる強さがあります。',
        biasWarning: {
            title: '「恐怖政治」バイアス',
            description: 'あなたは「仕事だから当然」と考えますが、部下はあなたを「血も涙もない独裁者」と恐れているかもしれません。心理的安全性が低く、バッドニュースが隠蔽されやすくなっています。',
            countermeasure: '用件に入る前に、必ず「アイスブレイク（雑談）」を挟むこと。意識して笑顔を見せ、感謝の言葉を伝えること（心で思っていても、言葉にしないとゼロです）。'
        },
        subordinateHandling: [
            {
                targetType: '神経症傾向が高い (High N) 部下',
                risk: 'あなたの何気ない一言（「これ直して」）を「全人格の否定」と受け取り、メンタル不調に陥るリスクがある。',
                strategy: '「Sandwich法」を使う（褒める→修正点→期待）。彼らの感情的な反応を論理で論破しようとしないこと。',
                magicPhrase: '「いつも丁寧な仕事で助かってるよ。ここだけ修正してくれれば完璧だ。」'
            }
        ]
    },

    // --- Conscientiousness (C) ---
    {
        trait: 'C',
        value: 'High',
        title: '完璧な遂行者 (The Perfectionist)',
        description: 'あなたは基準が高く、自らもハードワークを厭いません。背中で語るリーダーとして信頼されます。',
        biasWarning: {
            title: 'マイクロマネジメント地獄',
            description: '「自分でやった方が早い」と思って仕事を抱え込んだり、部下の仕事の「てにをは」まで修正したりしていませんか？ それは部下の成長機会を奪う行為です。',
            countermeasure: '「60点」で提出させること。プロセスではなく「結果」だけを管理すること。部下のやり方が非効率に見えても、手を出さず見守る忍耐を持つこと。'
        },
        subordinateHandling: [
            {
                targetType: '誠実性が低い (Low C) 部下',
                risk: '彼らの「抜け漏れ」や「ルーズさ」が許せず、あなたのストレスが限界に達する。あなたが彼らの尻拭いをし続けることになる。',
                strategy: '精神論は通じない。「仕組み」で縛る。チェックリストを作らせ、進捗報告の頻度を上げる。期限はバッファを持たせて設定する。',
                magicPhrase: '「このチェックリストの項目を埋めてから提出してくれる？」'
            }
        ]
    },
    {
        trait: 'C',
        value: 'Low',
        title: '柔軟な即興家 (The Flexible Improviser)',
        description: 'あなたは変化に強く、カオスな状況でもリラックスしています。大局観があり、些末なことにこだわりません。',
        biasWarning: {
            title: '「よしなにやって」バイアス',
            description: 'あなたの指示は曖昧で、期限もあやふやです。部下（特にHigh Cタイプ）は「具体的なゴールが見えない」と強いストレスを感じています。',
            countermeasure: '指示を出す時は「期限」「品質基準」「成果物」を言語化して定義すること。Googleカレンダーやタスク管理ツールを強制的に使うこと。'
        },
        subordinateHandling: [
            {
                targetType: '誠実性が高い (High C) 部下',
                risk: 'あなたが気まぐれに変更した方針に対して、彼らは「今までの努力が無駄になった」と激怒する（表には出さないが）。',
                strategy: '彼らの「計画性」を尊重する。変更がある場合は、早めに伝え、理由を論理的に説明する。彼らを私の「秘書役」として頼りにする。',
                magicPhrase: '「急な変更で申し訳ない。君の計画力で、なんとかリカバリー案を作ってくれないか？」'
            }
        ]
    },

    // --- Neuroticism (N) ---
    {
        trait: 'N',
        value: 'High',
        title: '慎重な守護者 (The Vigilant Sentinel)',
        description: 'あなたはリスクに対する感度が高く、最悪の事態を想定して準備することができます。',
        biasWarning: {
            title: '「不安の伝染」バイアス',
            description: 'あなたの不安気な表情や態度は、ウイルスのように部下に伝染します。リーダーが動揺すると、組織全体がパニックになります。',
            countermeasure: '「不機嫌」は最大の罪だと心得る。不安な時こそ、深呼吸して意識的にゆっくり話し、堂々と振る舞う「演技」をすること。不安の吐き出しは部下ではなく、ノートに行うこと。'
        },
        subordinateHandling: [
            {
                targetType: '神経症傾向が低い (Low N) 部下',
                risk: '彼らの「なんとかなるさ」という楽観的な態度が、あなたには「無責任」「危機感がない」と映り、イライラする。',
                strategy: '彼らのメンタル強度を信頼し、プレッシャーのかかる新規開拓やトラブル対応の最前線を任せる。',
                magicPhrase: '「君の度胸が必要だ。この難局、頼んだよ。」'
            }
        ]
    },

    // --- Openness (O) ---
    {
        trait: 'O',
        value: 'High',
        title: '革新的なビジョナリー (The Visionary)',
        description: 'あなたは常識に囚われないアイデアを持ち、組織にイノベーションをもたらします。',
        biasWarning: {
            title: '「現場無視」バイアス',
            description: '次々と新しいアイデアを思いつき、昨日の指示を今日ひっくり返していませんか？ 現場はあなたの「思いつき」に振り回され、疲弊しています。',
            countermeasure: '「着想」と「実行」を分けること。新しいアイデアを思いついても、即座に現場に落とさず、一晩寝かせるか、参謀役に相談すること。'
        },
        subordinateHandling: [
            {
                targetType: '開放性が低い (Low O) 部下',
                risk: '彼らは変化を恐れる。あなたが「カイゼンだ！」と手順を変えると、彼らは仕事を奪われたように感じて抵抗する。',
                strategy: '変化の「メリット」ではなく、変化しないことの「リスク」を説明する。手順は少しずつ、マニュアルを整備しながら変えていく。',
                magicPhrase: '「君が慣れ親しんだこのやり方を守るためにも、ここだけ少し改善したいんだ。」'
            }
        ]
    }
];

export function getManagementAdvice(scores: { E: number, N: number, C: number, A: number, O: number }): ManagementAdvice[] {
    const advice: ManagementAdvice[] = [];
    const THRESHOLD_HIGH = 60;
    const THRESHOLD_LOW = 40;

    // Check each trait
    if (scores.E >= THRESHOLD_HIGH) advice.push(MANAGEMENT_ADVICE_DATA.find(d => d.trait === 'E' && d.value === 'High')!);
    if (scores.E <= THRESHOLD_LOW) advice.push(MANAGEMENT_ADVICE_DATA.find(d => d.trait === 'E' && d.value === 'Low')!);

    if (scores.A >= THRESHOLD_HIGH) advice.push(MANAGEMENT_ADVICE_DATA.find(d => d.trait === 'A' && d.value === 'High')!);
    if (scores.A <= THRESHOLD_LOW) advice.push(MANAGEMENT_ADVICE_DATA.find(d => d.trait === 'A' && d.value === 'Low')!);

    if (scores.C >= THRESHOLD_HIGH) advice.push(MANAGEMENT_ADVICE_DATA.find(d => d.trait === 'C' && d.value === 'High')!);
    if (scores.C <= THRESHOLD_LOW) advice.push(MANAGEMENT_ADVICE_DATA.find(d => d.trait === 'C' && d.value === 'Low')!);

    if (scores.N >= THRESHOLD_HIGH) advice.push(MANAGEMENT_ADVICE_DATA.find(d => d.trait === 'N' && d.value === 'High')!);
    // Low N is usually fine, but if we have content we can add it. For now I only defined High N warnings as it's more critical for management.
    // Wait, I didn't define Low N in the array relative to *management pitfalls* as much? 
    // Actually, let's look at the data. I defined High E, Low E, High A, Low A, High C, Low C, High N, High O.
    // Missing: Low N, Low O in the definitions above?
    // Let's stick to the ones that have significant "Management Bias".
    // Low N (Unflappable) is generally good for leaders, minimal bias compared to High N.
    // Low O (Traditionalist) is also a valid style.

    if (scores.O >= THRESHOLD_HIGH) advice.push(MANAGEMENT_ADVICE_DATA.find(d => d.trait === 'O' && d.value === 'High')!);

    return advice;
}
