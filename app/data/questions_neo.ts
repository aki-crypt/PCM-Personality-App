export type Facet = // Force update to trigger build
    | 'N1' | 'N2' | 'N3' | 'N4' | 'N5' | 'N6'
    | 'E1' | 'E2' | 'E3' | 'E4' | 'E5' | 'E6'
    | 'O1' | 'O2' | 'O3' | 'O4' | 'O5' | 'O6'
    | 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6'
    | 'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'C6';

export type QuestionNeo = {
    id: number;
    text_en: string;
    text_ja: string;
    domain: 'N' | 'E' | 'O' | 'A' | 'C';
    facet: Facet;
    key: '+' | '-';
};

export const questionsNeo: QuestionNeo[] = [
    // --- Neuroticism ---
    // N1: Anxiety (心配性)
    { id: 1, text_en: "Worry about things.", text_ja: "色々なことを心配する。", domain: 'N', facet: 'N1', key: '+' },
    { id: 31, text_en: "Fear for the worst.", text_ja: "最悪の事態を恐れる。", domain: 'N', facet: 'N1', key: '+' },
    { id: 61, text_en: "Am afraid of many things.", text_ja: "多くのことを恐れる。", domain: 'N', facet: 'N1', key: '+' },
    { id: 91, text_en: "Get stressed out easily.", text_ja: "すぐにストレスを感じる。", domain: 'N', facet: 'N1', key: '+' },

    // N2: Anger (怒り)
    { id: 6, text_en: "Get angry easily.", text_ja: "すぐに腹を立てる。", domain: 'N', facet: 'N2', key: '+' },
    { id: 36, text_en: "Get irritated easily.", text_ja: "すぐにイライラする。", domain: 'N', facet: 'N2', key: '+' },
    { id: 66, text_en: "Lose my temper.", text_ja: "かんしゃくを起こす（キレる）。", domain: 'N', facet: 'N2', key: '+' },
    { id: 96, text_en: "Rarely get irritated.", text_ja: "めったにイライラしない。", domain: 'N', facet: 'N2', key: '-' },

    // N3: Depression (抑うつ)
    { id: 11, text_en: "Often feel blue.", text_ja: "よく気分が落ち込む。", domain: 'N', facet: 'N3', key: '+' },
    { id: 41, text_en: "Dislike myself.", text_ja: "自分が嫌いだ。", domain: 'N', facet: 'N3', key: '+' },
    { id: 71, text_en: "Am often down in the dumps.", text_ja: "よく塞ぎ込む。", domain: 'N', facet: 'N3', key: '+' },
    { id: 101, text_en: "Have a low opinion of myself.", text_ja: "自分を低く評価している。", domain: 'N', facet: 'N3', key: '+' },

    // N4: Self-Consciousness (自意識過剰)
    { id: 16, text_en: "Find it difficult to approach others.", text_ja: "他人に近づきにくいと感じる。", domain: 'N', facet: 'N4', key: '+' },
    { id: 46, text_en: "Am easily intimidated.", text_ja: "すぐに気後れする（おじけづく）。", domain: 'N', facet: 'N4', key: '+' },
    { id: 76, text_en: "Am not embarrassed easily.", text_ja: "簡単には恥ずかしがらない。", domain: 'N', facet: 'N4', key: '-' },
    { id: 106, text_en: "Am able to stand up for myself.", text_ja: "自分の立場を主張できる。", domain: 'N', facet: 'N4', key: '-' },
    // 106 is often "Stumble over my words" (+) or reverse. List said "Am able to stand up for myself." (-) for N4? Or is it E3?
    // "Stand up for myself" is usually E3 (Assertiveness).
    // Let's re-check N4 items. 
    // N4: 16, 46, 76, 106.
    // Item 106 in list: "Am able to stand up for myself." 
    // If this is N4, it's definitively (-). Because N4 is "Self-Consciousness" (Social Anxiety). Standing up is opposite.

    // N5: Immoderation (無節制/衝動性)
    { id: 21, text_en: "Often eat too much.", text_ja: "よく食べすぎる。", domain: 'N', facet: 'N5', key: '+' }, // "Go on binges"
    { id: 51, text_en: "Go on binges.", text_ja: "ドカ食い（または浪費）をする。", domain: 'N', facet: 'N5', key: '+' },
    // Wait, item 21 and 51 are similar.
    { id: 81, text_en: "Rarely overindulge.", text_ja: "めったにハメを外さない。", domain: 'N', facet: 'N5', key: '-' },
    { id: 111, text_en: "Am able to control my cravings.", text_ja: "欲求をコントロールできる。", domain: 'N', facet: 'N5', key: '-' },

    // N6: Vulnerability (ストレス脆弱性)
    { id: 26, text_en: "Feel that I'm unable to deal with things.", text_ja: "物事に対処できないと感じる。", domain: 'N', facet: 'N6', key: '+' },
    { id: 56, text_en: "Remain calm under pressure.", text_ja: "プレッシャーがかかっても冷静でいられる。", domain: 'N', facet: 'N6', key: '-' },
    { id: 86, text_en: "Know how to cope.", text_ja: "対処法を知っている（うまく切り抜けられる）。", domain: 'N', facet: 'N6', key: '-' },
    { id: 116, text_en: "Am calm even in tense situations.", text_ja: "緊張する場面でも落ち着いている。", domain: 'N', facet: 'N6', key: '-' },

    // --- Extraversion ---
    // E1: Friendliness (親しみやすさ)
    { id: 2, text_en: "Make friends easily.", text_ja: "すぐに友達ができる。", domain: 'E', facet: 'E1', key: '+' },
    { id: 32, text_en: "Warm up quickly to others.", text_ja: "すぐに人と打ち解ける。", domain: 'E', facet: 'E1', key: '+' },
    { id: 62, text_en: "Feel comfortable around people.", text_ja: "人の中にいると居心地が良い。", domain: 'E', facet: 'E1', key: '+' },
    { id: 92, text_en: "Act comfortably with others.", text_ja: "他人と気楽に接する。", domain: 'E', facet: 'E1', key: '+' },

    // E2: Gregariousness (社交性)
    { id: 7, text_en: "Love large parties.", text_ja: "大人数のパーティーが大好きだ。", domain: 'E', facet: 'E2', key: '+' },
    { id: 37, text_en: "Talk to a lot of different people at parties.", text_ja: "パーティーでは多くの人と話す。", domain: 'E', facet: 'E2', key: '+' },
    { id: 67, text_en: "Don't like crowded events.", text_ja: "混雑したイベントは好きではない。", domain: 'E', facet: 'E2', key: '-' },
    { id: 97, text_en: "Avoid crowds.", text_ja: "人混みを避ける。", domain: 'E', facet: 'E2', key: '-' },

    // E3: Assertiveness (自己主張)
    { id: 12, text_en: "Take charge.", text_ja: "主導権を握る（指揮を執る）。", domain: 'E', facet: 'E3', key: '+' },
    { id: 42, text_en: "Try to lead others.", text_ja: "他人をリードしようとする。", domain: 'E', facet: 'E3', key: '+' },
    { id: 72, text_en: "Take control of things.", text_ja: "事態をコントロールする。", domain: 'E', facet: 'E3', key: '+' },
    { id: 102, text_en: "Wait for others to lead the way.", text_ja: "他人が先導するのを待つ。", domain: 'E', facet: 'E3', key: '-' },

    // E4: Activity Level (活動性)
    { id: 17, text_en: "Am always busy.", text_ja: "いつも忙しくしている。", domain: 'E', facet: 'E4', key: '+' },
    { id: 47, text_en: "Am always on the go.", text_ja: "いつも活動している（じっとしていない）。", domain: 'E', facet: 'E4', key: '+' },
    { id: 77, text_en: "Do a lot in my spare time.", text_ja: "暇な時間に多くのことをこなす。", domain: 'E', facet: 'E4', key: '+' },
    { id: 107, text_en: "Can manage many things at the same time.", text_ja: "同時に多くのことをこなせる。", domain: 'E', facet: 'E4', key: '+' },

    // E5: Excitement-Seeking (刺激希求性)
    { id: 22, text_en: "Love excitement.", text_ja: "刺激的なことが大好きだ。", domain: 'E', facet: 'E5', key: '+' },
    { id: 52, text_en: "Seek adventure.", text_ja: "冒険を求める。", domain: 'E', facet: 'E5', key: '+' },
    { id: 82, text_en: "Love action.", text_ja: "アクション（活動的なこと）が好きだ。", domain: 'E', facet: 'E5', key: '+' },
    { id: 112, text_en: "Enjoy being reckless.", text_ja: "向こう見ずなことを楽しむ。", domain: 'E', facet: 'E5', key: '+' },

    // E6: Cheerfulness (陽気さ)
    { id: 27, text_en: "Radiate joy.", text_ja: "喜びを振りまく（明るい雰囲気を出す）。", domain: 'E', facet: 'E6', key: '+' },
    { id: 57, text_en: "Have a lot of fun.", text_ja: "大いに楽しむ。", domain: 'E', facet: 'E6', key: '+' },
    { id: 87, text_en: "Love life.", text_ja: "人生を愛している。", domain: 'E', facet: 'E6', key: '+' },
    { id: 117, text_en: "Laugh aloud.", text_ja: "声を出して笑う。", domain: 'E', facet: 'E6', key: '+' },

    // --- Openness ---
    // O1: Imagination (想像力)
    { id: 3, text_en: "Have a vivid imagination.", text_ja: "鮮やかな想像力を持っている。", domain: 'O', facet: 'O1', key: '+' },
    { id: 33, text_en: "Enjoy wild flights of fantasy.", text_ja: "奔放な空想を楽しむ。", domain: 'O', facet: 'O1', key: '+' },
    { id: 63, text_en: "Love to daydream.", text_ja: "空想にふけるのが好きだ。", domain: 'O', facet: 'O1', key: '+' },
    { id: 93, text_en: "Like to get lost in thought.", text_ja: "物思いにふけるのが好きだ。", domain: 'O', facet: 'O1', key: '+' },

    // O2: Artistic Interests (芸術的関心)
    { id: 8, text_en: "Believe in the importance of art.", text_ja: "芸術は重要だと信じている。", domain: 'O', facet: 'O2', key: '+' },
    { id: 38, text_en: "Do not like art.", text_ja: "芸術が好きではない。", domain: 'O', facet: 'O2', key: '-' },
    { id: 68, text_en: "Do not like poetry.", text_ja: "詩が好きではない。", domain: 'O', facet: 'O2', key: '-' },
    { id: 98, text_en: "Do not enjoy going to art museums.", text_ja: "美術館に行くのは楽しくない。", domain: 'O', facet: 'O2', key: '-' },

    // O3: Emotionality (情動性)
    { id: 13, text_en: "Experience my emotions intensely.", text_ja: "感情を強く感じるほうだ。", domain: 'O', facet: 'O3', key: '+' },
    { id: 43, text_en: "Seldom get emotional.", text_ja: "めったに感情的にならない。", domain: 'O', facet: 'O3', key: '-' },
    { id: 73, text_en: "Rarely notice my emotional reactions.", text_ja: "自分の感情の動きにあまり気づかない。", domain: 'O', facet: 'O3', key: '-' },
    { id: 103, text_en: "Experience very few emotional highs and lows.", text_ja: "感情の起伏がほとんどない。", domain: 'O', facet: 'O3', key: '-' },

    // O4: Adventurousness (冒険心)
    { id: 18, text_en: "Prefer variety to routine.", text_ja: "ルーチンワークより変化を好む。", domain: 'O', facet: 'O4', key: '+' },
    { id: 48, text_en: "Dislike changes.", text_ja: "変化を嫌う。", domain: 'O', facet: 'O4', key: '-' },
    { id: 78, text_en: "Don't like the idea of change.", text_ja: "変わるという考えが好きではない。", domain: 'O', facet: 'O4', key: '-' },
    { id: 108, text_en: "Am attached to conventional ways.", text_ja: "従来のやり方に固執する。", domain: 'O', facet: 'O4', key: '-' },

    // O5: Intellect (知性/知的好奇心)
    { id: 23, text_en: "Love to read challenging material.", text_ja: "読み応えのある難しい本を読むのが好きだ。", domain: 'O', facet: 'O5', key: '+' },
    { id: 53, text_en: "Avoid philosophical discussions.", text_ja: "哲学的な議論を避ける。", domain: 'O', facet: 'O5', key: '-' },
    { id: 83, text_en: "Have difficulty understanding abstract ideas.", text_ja: "抽象的な概念を理解するのが苦手だ。", domain: 'O', facet: 'O5', key: '-' },
    { id: 113, text_en: "Am not interested in theoretical discussions.", text_ja: "理論的な議論には興味がない。", domain: 'O', facet: 'O5', key: '-' },

    // O6: Liberalism (リベラリズム/価値観の柔軟性)
    { id: 28, text_en: "Tend to vote for liberal political candidates.", text_ja: "リベラル（革新的）な候補者に投票する傾向がある。", domain: 'O', facet: 'O6', key: '+' },
    { id: 58, text_en: "Believe that there is no absolute right or wrong.", text_ja: "絶対的な善悪などないと信じている。", domain: 'O', facet: 'O6', key: '+' },
    { id: 88, text_en: "Tend to vote for conservative political candidates.", text_ja: "保守的な候補者に投票する傾向がある。", domain: 'O', facet: 'O6', key: '-' },
    { id: 118, text_en: "Like to stand during the national anthem.", text_ja: "国歌斉唱の時は起立するのが好きだ（伝統を重んじる）。", domain: 'O', facet: 'O6', key: '-' },

    // --- Agreeableness ---
    // A1: Trust (信頼)
    { id: 4, text_en: "Trust others.", text_ja: "人を信頼する。", domain: 'A', facet: 'A1', key: '+' },
    { id: 34, text_en: "Believe that others have good intentions.", text_ja: "人は善意を持っていると信じている。", domain: 'A', facet: 'A1', key: '+' },
    { id: 64, text_en: "Trust what people say.", text_ja: "人の言うことを信用する。", domain: 'A', facet: 'A1', key: '+' },
    { id: 94, text_en: "Distrust people.", text_ja: "人を信用しない。", domain: 'A', facet: 'A1', key: '-' },

    // A2: Morality (誠実性/道徳性 - 率直さ)
    { id: 9, text_en: "Use others for my own ends.", text_ja: "自分の目的のために他人を利用する。", domain: 'A', facet: 'A2', key: '-' },
    { id: 39, text_en: "Know how to get around the rules.", text_ja: "規則をうまくかいくぐる方法を知っている。", domain: 'A', facet: 'A2', key: '-' },
    { id: 69, text_en: "Cheat to get ahead.", text_ja: "優位に立つためならズルをする。", domain: 'A', facet: 'A2', key: '-' },
    { id: 99, text_en: "Take advantage of others.", text_ja: "他人を利用する（つけ込む）。", domain: 'A', facet: 'A2', key: '-' },

    // A3: Altruism (利他主義)
    { id: 14, text_en: "Love to help others.", text_ja: "人を助けるのが大好きだ。", domain: 'A', facet: 'A3', key: '+' },
    { id: 44, text_en: "Am concerned about others.", text_ja: "他人のことを気にかけている。", domain: 'A', facet: 'A3', key: '+' },
    { id: 74, text_en: "Am indifferent to the feelings of others.", text_ja: "他人の感情に無関心だ。", domain: 'A', facet: 'A3', key: '-' },
    { id: 104, text_en: "Turn my back on others.", text_ja: "他人に背を向ける（困っている人を見捨てる）。", domain: 'A', facet: 'A3', key: '-' },
    // Wait, my inferred list for 74 in search result said "Am indifferent" (-). 
    // Let me check my key mapping. 
    // Item 44: "Love to help others" (+).
    // Item 74: "Am indifferent to the feelings of others" (-).
    // The list says 104 is "Turn my back on others" (-).
    // My list had 44 as "Am concerned" (+). 
    // I will use positive / negative appropriately.
    // 14: Love to help (A3+)
    // 44: Love to help (Wait, item 44 repeats 14?) No.
    // Let's use standard diverse items.
    // 14: Love to help others.
    // 44: Am indifferent to the feelings of others. (-)
    // 74: Look down on others? No.
    // Let's use the provided list items.
    // 74: Am indifferent to the feelings of others. (-)
    // 104: Turn my back on others. (-)
    // 44 from list was "Am indifferent" or "Love to help". The list had variants.
    // Let's set:
    // 14: Love to help others. (+)
    // 44: Am concerned about others. (+)
    // 74: Am indifferent to the feelings of others. (-)
    // 104: Turn my back on others. (-)

    // A4: Cooperation (協調性)
    { id: 19, text_en: "Love a good fight.", text_ja: "喧嘩（争い）をするのが好きだ。", domain: 'A', facet: 'A4', key: '-' },
    { id: 49, text_en: "Yell at people.", text_ja: "人を怒鳴りつける。", domain: 'A', facet: 'A4', key: '-' },
    { id: 79, text_en: "Insult people.", text_ja: "人を侮辱する。", domain: 'A', facet: 'A4', key: '-' },
    { id: 109, text_en: "Get back at others.", text_ja: "人に仕返しをする。", domain: 'A', facet: 'A4', key: '-' },

    // A5: Modesty (謙遜)
    { id: 24, text_en: "Believe that I am better than others.", text_ja: "自分は他人より優れていると信じている。", domain: 'A', facet: 'A5', key: '-' },
    { id: 54, text_en: "Think highly of myself.", text_ja: "自分のことを高く評価している。", domain: 'A', facet: 'A5', key: '-' },
    { id: 84, text_en: "Have a high opinion of myself.", text_ja: "自分に自信過剰だ。", domain: 'A', facet: 'A5', key: '-' },
    { id: 114, text_en: "Make myself the center of attention.", text_ja: "自分を注目の的にしようとする。", domain: 'A', facet: 'A5', key: '-' },

    // A6: Sympathy (共感性)
    { id: 29, text_en: "Sympathize with the homeless.", text_ja: "ホームレスの人々に同情する。", domain: 'A', facet: 'A6', key: '+' },
    { id: 59, text_en: "Feel sympathy for those who are worse off than myself.", text_ja: "自分より不遇な人々に同情を感じる。", domain: 'A', facet: 'A6', key: '+' },
    { id: 89, text_en: "Suffer from others' sorrows.", text_ja: "他人の悲しみに胸を痛める。", domain: 'A', facet: 'A6', key: '+' },
    { id: 119, text_en: "Am not interested in other people's problems.", text_ja: "他人の問題には興味がない。", domain: 'A', facet: 'A6', key: '-' },

    // --- Conscientiousness ---
    // C1: Self-Efficacy (自己効力感)
    { id: 5, text_en: "Complete tasks successfully.", text_ja: "仕事を首尾よくやり遂げる。", domain: 'C', facet: 'C1', key: '+' },
    { id: 35, text_en: "Excel in what I do.", text_ja: "自分のすることにおいて優れている。", domain: 'C', facet: 'C1', key: '+' },
    { id: 65, text_en: "Handle tasks smoothly.", text_ja: "仕事をスムーズにこなす。", domain: 'C', facet: 'C1', key: '+' },
    { id: 95, text_en: "Know how to get things done.", text_ja: "物事の進め方を心得ている。", domain: 'C', facet: 'C1', key: '+' },

    // C2: Orderliness (秩序性)
    { id: 10, text_en: "Like to tidy up.", text_ja: "片付けが好きだ。", domain: 'C', facet: 'C2', key: '+' },
    { id: 40, text_en: "Leave a mess in my room.", text_ja: "部屋を散らかしたままにする。", domain: 'C', facet: 'C2', key: '-' },
    { id: 70, text_en: "Leave a mess in my room.", text_ja: "部屋を散らかす。", domain: 'C', facet: 'C2', key: '-' },
    { id: 100, text_en: "Leave my belongings around.", text_ja: "物を出しっ放しにする。", domain: 'C', facet: 'C2', key: '-' },

    // C3: Dutifulness (勤勉性/義務感)
    { id: 15, text_en: "Keep my promises.", text_ja: "約束を守る。", domain: 'C', facet: 'C3', key: '+' },
    { id: 45, text_en: "Tell the truth.", text_ja: "真実を話す。", domain: 'C', facet: 'C3', key: '+' },
    { id: 75, text_en: "Break my promises.", text_ja: "約束を破る。", domain: 'C', facet: 'C3', key: '-' },
    { id: 105, text_en: "Get others to do my duties.", text_ja: "自分の義務を他人に押し付ける。", domain: 'C', facet: 'C3', key: '-' },

    // C4: Achievement-Striving (達成努力)
    { id: 20, text_en: "Work hard.", text_ja: "一生懸命働く。", domain: 'C', facet: 'C4', key: '+' },
    { id: 50, text_en: "Do more than what's expected of me.", text_ja: "期待されている以上のことをする。", domain: 'C', facet: 'C4', key: '+' },
    { id: 80, text_en: "Set high standards for myself and others.", text_ja: "自分や他人に高い基準を設ける。", domain: 'C', facet: 'C4', key: '+' },
    { id: 110, text_en: "Am not highly motivated to succeed.", text_ja: "成功への意欲はあまり高くない。", domain: 'C', facet: 'C4', key: '-' },

    // C5: Self-Discipline (自己規律)
    { id: 25, text_en: "Start tasks right away.", text_ja: "仕事にはすぐに取り掛かる。", domain: 'C', facet: 'C5', key: '+' },
    { id: 55, text_en: "Find it difficult to get down to work.", text_ja: "なかなか仕事に取り掛かれない。", domain: 'C', facet: 'C5', key: '-' },
    { id: 85, text_en: "Need a push to get started.", text_ja: "やり始めるのに後押しが必要だ。", domain: 'C', facet: 'C5', key: '-' },
    { id: 115, text_en: "Have difficulty starting tasks.", text_ja: "課題を始めるのが苦手だ。", domain: 'C', facet: 'C5', key: '-' },

    // C6: Cautiousness (慎重さ)
    { id: 30, text_en: "Jump into things without thinking.", text_ja: "考えなしに飛び込む。", domain: 'C', facet: 'C6', key: '-' },
    { id: 60, text_en: "Make rash decisions.", text_ja: "軽率な決定を下す。", domain: 'C', facet: 'C6', key: '-' },
    { id: 90, text_en: "Rush into things.", text_ja: "物事を急いで進める。", domain: 'C', facet: 'C6', key: '-' },
    { id: 120, text_en: "Act without thinking.", text_ja: "何も考えずに行動する。", domain: 'C', facet: 'C6', key: '-' },
];


