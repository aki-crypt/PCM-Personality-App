export type SloanType = {
    code: string; // e.g., "SCOAI"
    title: string;
    description: string[];
    careers: string[];
    communicationAdvice: {
        strength: string[];
        weakness: string[];
        tips: string[];
    };
};

type TraitData = {
    high: { code: string; label: string; desc: string; comm: { strengths: string[]; weaknesses: string[]; tips: string[] } };
    low: { code: string; label: string; desc: string; comm: { strengths: string[]; weaknesses: string[]; tips: string[] } };
};

const TRAITS: Record<string, TraitData> = {
    E: {
        high: {
            code: 'S',
            label: 'Social (社交的)',
            desc: '人との交流を好み、エネルギッシュで自己主張ができるタイプです。',
            comm: {
                strengths: [
                    '場を明るくし、会話をリードする力があります。',
                    '初対面の人ともすぐに打ち解け、人脈を広げるのが得意です。',
                    '自分の意見をはっきりと伝えることができ、説得力があります。'
                ],
                weaknesses: [
                    '相手の話を遮ってしまったり、一方的に話し続けてしまうことがあります。',
                    '沈黙を恐れるあまり、埋めるために不要なことまで話してしまうかも。',
                    '静かにしていたい人のペースを乱してしまう可能性があります。'
                ],
                tips: [
                    '「聞き役」に回る時間を意識的に作りましょう。相手が話し終わるまで一呼吸待つのがコツです。',
                    '質問力（問いかける力）を磨くことで、一方通行ではなく双方向の深い会話が生まれます。'
                ]
            }
        },
        low: {
            code: 'R',
            label: 'Reserved (控えめ)',
            desc: '静かな環境を好み、内省的で、少人数の深い付き合いを好むタイプです。',
            comm: {
                strengths: [
                    '言葉を選んで話すため、発言に重みと信頼感があります。',
                    '相手の話をじっくり聞くことができるため、相談役に適しています。',
                    '冷静に状況を観察し、的確なタイミングで核心を突くことができます。'
                ],
                weaknesses: [
                    '考えすぎて発言のタイミングを逃し、「何も考えていない」と誤解されることがあります。',
                    '大人数の中では存在感が薄れ、意見が埋もれてしまいがちです。',
                    '感情表現が控えめなため、何を考えているか分かりにくいと思われがちです。'
                ],
                tips: [
                    '完璧な意見でなくても良いので、「私はこう思います」と小さな感想を口にする練習をしましょう。',
                    '会議などの前には、事前に話すポイントをメモしておくと安心して発言できます。'
                ]
            }
        }
    },
    N: {
        high: {
            code: 'L',
            label: 'Limbic (感情豊か)',
            desc: '感情の起伏があり、繊細で、物事を深く感じ取るタイプです。',
            comm: {
                strengths: [
                    '感受性が豊かで、他人の痛みや喜びに深く共感できます。',
                    '情熱的で、その熱意が周囲を動かす力になることがあります。',
                    '危機管理能力が高く、リスクに対して敏感に反応できます。'
                ],
                weaknesses: [
                    'ストレスがかかると感情的になり、冷静な議論が難しくなることがあります。',
                    '相手の些細な言動をネガティブに深読みしすぎてしまうかも。',
                    '不安や不満が表に出やすく、周囲に緊張感を与えてしまうことがあります。'
                ],
                tips: [
                    '感情が高ぶった時は、即答せずに「少し考えさせて」と時間を置きましょう。',
                    '不安を感じた時は、事実と感情を分けて整理し、具体的な解決策に目を向けましょう。'
                ]
            }
        },
        low: {
            code: 'C',
            label: 'Calm (穏やか)',
            desc: '情緒が安定しており、ストレスに強く、リラックスしているタイプです。',
            comm: {
                strengths: [
                    'どんな時でも動じず、周囲に安心感を与えることができます。',
                    '感情に流されず、事実に基づいて公平な判断・発言ができます。',
                    'ストレスの多い状況でも、冷静に対処し解決へ導く力があります。'
                ],
                weaknesses: [
                    '感情的な相手に対して「冷たい」「共感してくれない」と思われることがあります。',
                    '危機感が薄いと捉えられ、緊急時にのんびりしすぎているように見えるかも。',
                    '自分の感情をあまり表に出さないため、熱意が伝わりにくいことがあります。'
                ],
                tips: [
                    '相手が感情的になっている時は、理屈で返す前に「それは大変だったね」と感情に寄り添う一言を。',
                    '時には「悔しい」「嬉しい」といった感情言葉を意識して使うと、人間味が伝わります。'
                ]
            }
        }
    },
    O: {
        high: {
            code: 'I',
            label: 'Inquisitive (好奇心旺盛)',
            desc: '新しいアイデアや抽象的な概念に興味があり、創造的なタイプです。',
            comm: {
                strengths: [
                    '独自の視点を持っており、会話に新しい発見や知的刺激をもたらします。',
                    '抽象的な概念や複雑な理論を理解し、議論を楽しむことができます。',
                    '語彙が豊富で、表現力豊かなコミュニケーションができます。'
                ],
                weaknesses: [
                    '話が抽象的になりすぎたり、飛躍しすぎて、相手がついていけないことがあります。',
                    '現実的な話題や日常の雑談には興味を示さず、退屈そうな顔をしてしまうかも。',
                    '専門用語や難しい言葉を多用し、相手を萎縮させてしまうことがあります。'
                ],
                tips: [
                    '相手の知識レベルに合わせて、具体例やたとえ話を使って分かりやすく説明しましょう。',
                    '相手の「現実的な懸念」も重要な視点として尊重し、耳を傾けるようにしましょう。'
                ]
            }
        },
        low: {
            code: 'N',
            label: 'Non-curious (保守的)',
            desc: '現実的で、経験に基づいた具体的な事実を重視するタイプです。',
            comm: {
                strengths: [
                    '具体的で分かりやすい言葉を使い、実用的なコミュニケーションが得意です。',
                    '事実やデータに基づいた話をするため、信頼性が高いです。',
                    '常識的で地に足がついたアドバイスができます。'
                ],
                weaknesses: [
                    '新しいアイデアや変化に対して否定的な反応を示しやすいです。',
                    '「今まで通り」に固執し、柔軟な発想を持つ人の意欲を削いでしまうかも。',
                    '抽象的な議論や夢物語のような話には「意味がない」と態度に出てしまいがちです。'
                ],
                tips: [
                    '新しい提案に対して、すぐに「無理だ」と言わず「面白そうだね」と受け止める姿勢を見せましょう。',
                    '「なぜ（Why）」だけでなく「どのように（How）」という視点で話すと、強みが活かせます。'
                ]
            }
        }
    },
    A: {
        high: {
            code: 'A',
            label: 'Accommodating (受容的)',
            desc: '他者に対して親切で、協力的で、調和を重んじるタイプです。',
            comm: {
                strengths: [
                    '相手の立場に立って考えることができ、聞き上手で話しやすい雰囲気を作ります。',
                    'チームの調和を保ち、対立を避けて円満に解決する調整力があります。',
                    '感謝の気持ちを素直に伝えることができ、人間関係を良好に保ちます。'
                ],
                weaknesses: [
                    '「NO」と言えずに仕事を抱え込んだり、我慢しすぎてしまうことがあります。',
                    '対立を恐れるあまり、自分の本音や重要な指摘を飲み込んでしまうかも。',
                    '八方美人になり、誰の味方か分からず信頼を損なう可能性があります。'
                ],
                tips: [
                    '「NO」と言うことは、自分を守るだけでなく、相手に対する誠実さでもあります。',
                    '反対意見を言う時は「あなたの意見も分かるけど、私はこう思う」と、受容＋主張のサンドイッチ話法を使いましょう。'
                ]
            }
        },
        low: {
            code: 'E',
            label: 'Egocentric (自己中心的)',
            desc: '自分の利益や意見を優先し、競争的で、批判的な視点を持つタイプです。',
            comm: {
                strengths: [
                    '自分の意見を恐れずに主張でき、交渉や議論に強いです。',
                    '情に流されず、合理的な判断のもとで率直なフィードバックができます。',
                    '競争心があり、周囲を鼓舞して結果を出すリーダーシップを発揮することがあります。'
                ],
                weaknesses: [
                    '言い方がストレートすぎて、相手を傷つけたり、攻撃的だと受け取られることがあります。',
                    '相手の感情や事情を軽視し、「冷酷」「傲慢」と誤解されるかも。',
                    '他人の意見を聞き入れず、独断で進めてしまいがちです。'
                ],
                tips: [
                    '「正しいこと」を言う時ほど、言い方には最新の注意を払いましょう。クッション言葉が有効です。',
                    '批判をする前に、まず相手の良い点を一つ見つけて伝える習慣をつけましょう。'
                ]
            }
        }
    },
    C: { // Big Five Conscientiousness
        high: {
            code: 'O',
            label: 'Organized (几帳面)',
            desc: '計画的で、整理整頓を好み、責任感が強いタイプです。',
            comm: {
                strengths: [
                    '論理的で順序立てた説明が得意で、相手に安心感・信頼感を与えます。',
                    '約束や時間を守り、責任ある言動で周囲からの信頼が厚いです。',
                    '詳細な計画やリスクについても事前に共有・相談ができます。'
                ],
                weaknesses: [
                    '完璧を求めすぎて、他人の些細なミスやルーズさを許せず、厳しく指摘してしまうかも。',
                    '融通が利かず、急な変更や曖昧な指示に対してストレスを感じ、不機嫌になることがあります。',
                    '「正論」で相手を追い詰めてしまうことがあります。'
                ],
                tips: [
                    '自分の中の「当たり前」の基準を他人に押し付けないようにしましょう。人にはそれぞれのペースがあります。',
                    '相手のミスを指摘する時は、人格ではなく「仕組み」や「行動」にフォーカスしましょう。'
                ]
            }
        },
        low: {
            code: 'U',
            label: 'Unstructured (奔放)',
            desc: '即興的で、柔軟性があり、細かいことにとらわれないタイプです。',
            comm: {
                strengths: [
                    '形式にとらわれない柔軟な発想で、楽しい会話やアイデアを生み出します。',
                    'おおらかで細かいことを気にしないため、相手にプレッシャーを与えません。',
                    '急な変更にも臨機応変に対応し、ポジティブに捉えることができます。'
                ],
                weaknesses: [
                    '話が脱線しやすく、結論がどこにあるのか分からなくなることがあります。',
                    '約束や期限に対してルーズに見られ、信頼を失ってしまうリスクがあります。',
                    '重要な詳細を見落とし、後でトラブルになることがあります。'
                ],
                tips: [
                    'ビジネスの場では、結論から話すことを意識しましょう。',
                    '重要な約束やタスクは、その場でメモを取り、相手と認識合わせをする習慣をつけると信頼度が増します。'
                ]
            }
        }
    }
};

const CAREER_DB = [
    { name: '営業職', traits: ['E+', 'A+', 'N-'] },
    { name: 'プログラマー/エンジニア', traits: ['E-', 'O+', 'C+'] },
    { name: 'デザイナー/クリエイター', traits: ['O+', 'C-'] },
    { name: '研究者', traits: ['O+', 'E-', 'C+'] },
    { name: '起業家', traits: ['E+', 'O+', 'N-'] },
    { name: 'カウンセラー', traits: ['A+', 'E-', 'O+'] },
    { name: 'プロジェクトマネージャー', traits: ['E+', 'C+', 'N-'] },
    { name: '会計士/経理', traits: ['C+', 'E-'] },
    { name: 'イベントプランナー', traits: ['E+', 'C+', 'O+'] },
    { name: 'カスタマーサポート', traits: ['A+', 'N-'] },
    { name: '人事 (HR)', traits: ['E+', 'A+'] },
    { name: 'マーケター', traits: ['O+', 'E+', 'A+'] },
    { name: '編集者/ライター', traits: ['O+', 'C+'] },
    { name: 'コンサルタント', traits: ['E+', 'O+', 'N-'] },
];

export const SLOAN_TYPES: Record<string, { title: string; jaTitle: string; icon: string; description: string }> = {
    'SCOAI': { title: 'The Angelic Visionary', jaTitle: '愛と秩序の革命家', icon: '😇', description: '社交的で情熱的、そして高い知性と計画性を兼ね備えたリーダータイプです。人々の幸福を願い、理想を実現するために周りを巻き込んで突き進むカリスマ性があります。' },
    'SCOAN': { title: 'The Guardian', jaTitle: '慈愛の守護者', icon: '🛡️', description: '伝統と秩序を重んじ、コミュニティの和を大切にする博愛主義者です。揺るぎない安定感で周囲を支え、誰もが安心して暮らせる環境を作り出します。' },
    'SCOEI': { title: 'The Boss', jaTitle: '冷徹な実力者', icon: '💼', description: '圧倒的な行動力と論理的思考で、どんな困難なプロジェクトも成功に導くビジネスリーダーです。感情に流されず、効率と結果を最優先に追求します。' },
    'SCOEN': { title: 'The Taskmaster', jaTitle: '鉄の規律者', icon: '🤖', description: 'ルールと秩序を徹底し、組織を完璧に統率する管理者です。私情を挟まない公平な判断と、揺るがない責任感で、周囲から厚い信頼を得ています。' },
    'SCUAI': { title: 'The Free Spirit', jaTitle: '自由な博愛主義者', icon: '🕊️', description: '誰とでもすぐに打ち解ける明るさと、柔軟な発想を持つムードメーカーです。計画よりもその場の「ノリ」と「パッション」を大切にし、毎日を祭りのように楽しみます。' },
    'SCUAN': { title: 'The Gentle Soul', jaTitle: '穏やかな平和主義者', icon: '🍵', description: '争いを好まず、人との調和を何よりも大切にする癒やし系です。細かいことは気にせず、流れに身を任せて生きるその姿は、周りの人の肩の力を抜いてくれます。' },
    'SCUEI': { title: 'The Entrepreneur', jaTitle: '大胆不敵な勝負師', icon: '🎲', description: 'リスクを恐れず、チャンスがあれば即座に飛び込む起業家タイプです。常識にとらわれない発想と行動力で、誰も見たことのない新しい道を切り拓きます。' },
    'SCUEN': { title: 'The Realist', jaTitle: 'ドライな現実主義者', icon: '🕶️', description: '感情や理想論に振り回されず、目の前の現実を淡々と処理する実務家です。複雑な問題もシンプルに解決するその手腕は、職人芸の域に達しています。' },
    'SLOAI': { title: 'The Sensitive Doer', jaTitle: '情熱的な奉仕者', icon: '❤️‍🔥', description: '人々の痛みに深く共感し、社会を良くするために尽くす活動家です。感受性が強く涙もろい一面もありますが、その「想いの強さ」が人を動かす原動力になります。' },
    'SLOAN': { title: 'The Traditionalist', jaTitle: '誠実な慎重派', icon: '📚', description: 'リスクを敏感に察知し、しっかりと準備を整えてから行動する堅実なタイプです。派手さはありませんが、約束を必ず守る誠実さで、長期的な信頼を築き上げます。' },
    'SLOEI': { title: 'The Dictator', jaTitle: '激情型の支配者', icon: '👑', description: '激しい感情と強い目的意識を持ち、自らの力で世界を変えようとする野心家です。時に感情が爆発することもありますが、そのエネルギーの大きさは誰にも真似できません。' },
    'SLOEN': { title: 'The Bureaucrat', jaTitle: '厳格な管理者', icon: '📝', description: '不正や怠慢を許さず、高い基準で自分も他人も律する規律の番人です。心配性な一面は「転ばぬ先の杖」として機能し、組織を致命的な失敗から守ります。' },
    'SLUAI': { title: 'The Chaotic Angel', jaTitle: '涙もろい自由人', icon: '🎭', description: '感情豊かで天真爛漫、まるで映画の主人公のようなドラマチックな人生を送る人です。気分の浮き沈みは激しいですが、その人間味あふれる魅力で多くの人に愛されます。' },
    'SLUAN': { title: 'The Follower', jaTitle: '誰かに寄り添う人', icon: '🐈', description: '自分の意見を押し通すよりも、誰かのサポート役として輝くタイプです。不安を感じやすい分、他人の不安にも敏感で、細やかな気配りができます。' },
    'SLUEI': { title: 'The Rebel', jaTitle: '反逆のカリスマ', icon: '🎸', description: '既存のルールや権威に反発し、自分の感性と衝動に従って生きるロックな魂の持ち主です。その危うさと儚さが、強烈な個性を放ちます。' },
    'SLUEN': { title: 'The Skeptic', jaTitle: '孤独な懐疑論者', icon: '🕵️', description: '世の中の常識や流行を疑い、独自の視点で真実を探求する孤高の存在です。人付き合いは苦手ですが、その鋭い洞察力は時に本質を射抜きます。' },
    'RCOAI': { title: 'The Scholar', jaTitle: '聡明な隠者', icon: '🦉', description: '静かな環境で読書や思索に耽ることを好む、知的な賢者タイプです。表には出ませんが、内面には熱い理想と深い知恵を秘めています。' },
    'RCOAN': { title: 'The Good Citizen', jaTitle: '静かなる良き隣人', icon: '🏡', description: '目立つことは好みませんが、自分の役割を黙々とこなし、社会を底辺で支える縁の下の力持ちです。穏やかで誠実な人柄は、周囲に安心感を与えます。' },
    'RCOEI': { title: 'The Mastermind', jaTitle: '冷静沈着な策士', icon: '♟️', description: '感情を表に出さず、淡々と、しかし着実に目標を達成する戦略家です。一人で集中して作業することを好み、圧倒的な生産性を叩き出します。' },
    'RCOEN': { title: 'The Mechanic', jaTitle: '孤高の職人', icon: '🔧', description: '自分の仕事に妥協を許さず、完璧を追求するプロフェッショナルです。他人に干渉されるのを嫌い、自分だけの城（領域）を守り抜きます。' },
    'RCUAI': { title: 'The Dreamer', jaTitle: '夢見る哲学者', icon: '🌙', description: '現実世界よりも、自分の頭の中にある空想の世界を愛するドリーマーです。独自の美学と世界観を持ち、芸術や創作活動で才能を発揮します。' },
    'RCUAN': { title: 'The Peaceful', jaTitle: '争いを好まない仙人', icon: '🏞️', description: '世俗の欲や競争から離れ、心静かに暮らすことを望むタイプです。少ない物で満足し、精神的な豊かさを大切にする生き方は、現代の隠遁者と言えます。' },
    'RCUEI': { title: 'The Innovator', jaTitle: '独自の道を歩く天才', icon: '💡', description: '誰も思いつかないような独創的なアイデアを、ひょうひょうと実現してしまう天才肌です。他人の評価を気にせず、我が道を行くスタイルを貫きます。' },
    'RCUEN': { title: 'The Minimalist', jaTitle: '無駄を嫌う合理主義者', icon: '📦', description: '感情や装飾を削ぎ落とし、機能美と効率性を極限まで追求するミニマリストです。シンプルで本質的な生き方が、洗練された印象を与えます。' },
    'RLOAI': { title: 'The Martyr', jaTitle: '献身的な理想家', icon: '🕯️', description: '自分のことよりも他人の幸せを優先し、自己犠牲も厭わない聖人のような心を持っています。その純粋すぎる優しさに、周囲は心を洗われます。' },
    'RLOAN': { title: 'The Worrier', jaTitle: '思慮深い慎重派', icon: '☂️', description: '石橋を叩いて渡る慎重さと、深い内省的な思考を持つタイプです。不安は「準備不足のシグナル」と捉え、綿密な計画で未来のリスクに備えます。' },
    'RLOEI': { title: 'The Critic', jaTitle: '鋭い批判者', icon: '⚡', description: '世の中の矛盾や不正に対して敏感で、鋭い批判眼を持つ評論家タイプです。その言葉は時に厳しいですが、現状を打破するための重要な指摘が含まれています。' },
    'RLOEN': { title: 'The Hermit', jaTitle: '殻に閉じこもる賢者', icon: '🐚', description: '傷つくことを恐れ、強固な防壁の中に引きこもる繊細な人です。しかしその内側では、誰よりも深く物事を考え、独自の哲学体系を構築しています。' },
    'RLUAI': { title: 'The Poet', jaTitle: '傷つきやすい詩人', icon: '✒️', description: '風に舞う木の葉のように繊細で、世界の美しさや悲しみを敏感に感じ取る詩人です。その儚げな雰囲気は、守ってあげたくなるような魅力を醸し出します。' },
    'RLUAN': { title: 'The Drifter', jaTitle: '風の吹くまま生きる人', icon: '🍃', description: '確固たる自分を持たず、環境や付き合う人に合わせて自分を変えられるカメレオンのような人です。その捉えどころのなさが、不思議な魅力となっています。' },
    'RLUEI': { title: 'The Cynic', jaTitle: '皮肉屋の芸術家', icon: '🎨', description: 'メランコリックな気分とシニカルな視点を持ち、それをブラックユーモアやアートに昇華させる表現者です。世の中を斜めから見る視点がユニークです。' },
    'RLUEN': { title: 'The Lost Soul', jaTitle: '迷える旅人', icon: '🚶', description: '「自分は何者か」「どこへ向かうべきか」を常に問い続ける、永遠の探求者です。定住せず、心の安住の地を求めてさすらうその姿は、どこか哲学的です。' },
};

export function getSloanType(scores: { E: number, N: number, O: number, A: number, C: number }): SloanType {
    // 1. Determine letters
    const codeMap = {
        E: scores.E >= 50 ? TRAITS.E.high : TRAITS.E.low,
        N: scores.N >= 50 ? TRAITS.N.high : TRAITS.N.low,
        C: scores.C >= 50 ? TRAITS.C.high : TRAITS.C.low,
        A: scores.A >= 50 ? TRAITS.A.high : TRAITS.A.low,
        O: scores.O >= 50 ? TRAITS.O.high : TRAITS.O.low,
    };

    const sloanCode = [
        codeMap.E.code,
        codeMap.N.code,
        codeMap.C.code,
        codeMap.A.code,
        codeMap.O.code
    ].join('');

    const codeKey = sloanCode as keyof typeof SLOAN_TYPES;
    const typeInfo = SLOAN_TYPES[codeKey] || { title: sloanCode, jaTitle: '不明なタイプ', icon: '❓', description: 'データが見つかりませんでした。' };

    // 2. Generate Description
    const title = `${typeInfo.jaTitle} (${typeInfo.title}) ${typeInfo.icon}`;

    const description = [
        typeInfo.description
    ];

    // 3. Match Careers
    const scoredCareers = CAREER_DB.map(career => {
        let matchScore = 0;
        career.traits.forEach(req => {
            const traitKey = req[0];
            const sign = req[1];
            const userVal = scores[traitKey as keyof typeof scores];
            const isHigh = userVal >= 50;
            if (sign === '+' && isHigh) matchScore++;
            if (sign === '-' && !isHigh) matchScore++;
        });
        return { ...career, matchScore };
    });

    scoredCareers.sort((a, b) => b.matchScore - a.matchScore);
    const topCareers = scoredCareers.slice(0, 5).map(c => c.name);

    // 4. Communication Advice
    // Aggregate all advice from the 5 traits
    const allStrengths = [
        ...codeMap.E.comm.strengths,
        ...codeMap.A.comm.strengths,
        ...codeMap.N.comm.strengths,
        ...codeMap.C.comm.strengths,
        ...codeMap.O.comm.strengths
    ];

    const allWeaknesses = [
        ...codeMap.E.comm.weaknesses,
        ...codeMap.A.comm.weaknesses,
        ...codeMap.N.comm.weaknesses,
        ...codeMap.C.comm.weaknesses,
        ...codeMap.O.comm.weaknesses
    ];

    const allTips = [
        ...codeMap.E.comm.tips,
        ...codeMap.A.comm.tips,
        ...codeMap.N.comm.tips,
        ...codeMap.C.comm.tips,
        ...codeMap.O.comm.tips
    ];

    // Shuffle or select logic?
    // Showing ALL 15 items might be too much. Let's pick:
    // - Top 2 most prominent traits? (Extremely high or low scores)
    // - Or just random selection?
    // - OR show key ones. 
    // Let's just show top 3-4 that are most relevant based on score extremity.

    const getExtremity = (trait: string, score: number) => Math.abs(score - 50);

    const traitList = ['E', 'N', 'C', 'A', 'O'];
    const rankedTraits = traitList.sort((a, b) => {
        const scoreA = scores[a as keyof typeof scores];
        const scoreB = scores[b as keyof typeof scores];
        return getExtremity(b, scoreB) - getExtremity(a, scoreA);
    });

    // Pick advice from the top 3 most extreme traits
    const top3Traits = rankedTraits.slice(0, 3);

    const selectedStrength: string[] = [];
    const selectedWeakness: string[] = [];
    const selectedTips: string[] = [];

    top3Traits.forEach(t => {
        // @ts-ignore
        const data = codeMap[t].comm;
        // Pick 1-2 items from each category randomly or just the first ones
        selectedStrength.push(data.strengths[0]);
        if (Math.random() > 0.5) selectedStrength.push(data.strengths[1]);

        selectedWeakness.push(data.weaknesses[0]);
        if (Math.random() > 0.5) selectedWeakness.push(data.weaknesses[1]);

        selectedTips.push(data.tips[0]);
        if (data.tips[1]) selectedTips.push(data.tips[1]);
    });

    return {
        code: sloanCode,
        title,
        description,
        careers: topCareers,
        communicationAdvice: {
            strength: selectedStrength.slice(0, 5), // Limit to 5-6 items
            weakness: selectedWeakness.slice(0, 5),
            tips: selectedTips.slice(0, 5)
        }
    };
}

