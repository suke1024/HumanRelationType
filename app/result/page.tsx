"use client";
import { useEffect, useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

type ResultData = {
  categoryAverages: { category: number; avgScore: number }[];
};

const TYPE_LABELS = [
  "横柄で支配的",
  "執念深く自己中心的",
  "冷淡でよそよそしい",
  "引っ込み思案",
  "自己主張ができない",
  "周りに合わせすぎる",
  "自己犠牲的",
  "おせっかいで要求がましい",
];

const ADVICE_MAP: Record<
  string,
  { summary: string; detail: string }
> = {
  "横柄で支配的": {
    summary:
<<<<<<< HEAD
      "対人円環モデルでいう“高支配・低協調”の位置にあり、相手より主導権を強く握ろうとする傾向があります。",
    detail:
      "● Interpersonal Circumplex における高支配（Dominance）の特徴が見られ、会話や状況をコントロールしようとする傾向があります。\n" +
      "● HEXACO の誠実‐謙虚性（Honesty–Humility）が低い場合にも類似の振る舞いが観察され、自己優位性を示しやすいとされています。\n" +
      "● この特性は場面によってリーダーシップとして有効ですが、他者の心理的安全性を損なう可能性があります。\n\n" +
      "【改善ポイント（科学的根拠）】\n" +
      "✓ Rogers (1951) による“積極的傾聴（Active Listening）”を取り入れると、他者の話を奪う傾向が減少します。\n" +
      "✓ 会話中に“要約して返す”技法を使うと共感的態度が高まり、支配的印象が弱まります。",
  },

  "執念深く自己中心的": {
    summary:
      "Big Five の“調和性（Agreeableness）”が低い領域に位置し、自己防衛的・競争的な対人態度が出やすい傾向があります。",
    detail:
      "● 社会心理学における“自己関与（ego involvement）”が高く、議論が自己価値と結びつきやすいタイプです。\n" +
      "● そのため、相手を説得・論破する行動が強まり、防衛的コミュニケーションを招くことがあります。\n" +
      "● 感情の強度が高いと、怒りや不満を外向きに表現しやすいことも特徴です。\n\n" +
      "【改善ポイント】\n" +
      "✓ “Iメッセージ（Gordon, 1970）”を使用すると衝突が減り、相手の防衛反応を弱められます。\n" +
      "✓ 感情の強度を 0〜10 で数値化する“Emotion Rating”を行うことで、反応の過剰さを抑えることができます。",
  },

  "冷淡でよそよそしい": {
    summary:
      "対人温かさ（Interpersonal Warmth）が低い状態で、愛着理論の“回避型愛着”と関連する行動パターンが見られます。",
    detail:
      "● 他者との心理的距離を保とうとする傾向が強く、感情的関与が苦手なタイプです。\n" +
      "● 愛着研究（Brennan, Clark & Shaver, 1998）では、回避型は自立を優先しすぎる特徴が見られるとされています。\n" +
      "● 感情表現の少なさは冷淡に見えることがありますが、必ずしも他者に関心がないわけではありません。\n\n" +
      "【改善ポイント】\n" +
      "✓ “小さな親切（Small Acts of Kindness）”の実践は、温かさと共感性を高める効果が実証されています。\n" +
      "✓ 感情日記をつけると内面の感情認識が高まり、他者との距離感が柔らかくなります。",
  },

  "引っ込み思案": {
    summary:
      "Big Five の“外向性（Extraversion）”が低い傾向と、社会不安（Social Anxiety）の要素が組み合わさった特徴を持ちます。",
    detail:
      "● Clark & Wells (1995) のモデルによれば、対人場面での“自己への過度な注意”が沈黙や緊張につながるとされています。\n" +
      "● 慎重さゆえに誤解されやすいものの、本質的には人嫌いではなく、安全が確保されれば関係を築きやすいタイプです。\n\n" +
      "【改善ポイント】\n" +
      "✓ 小さな自己開示を段階的に行う“段階的エクスポージャー（Gradual Exposure）”が効果的です。\n" +
      "✓ 会話の“準備スクリプト”を持つことで不安予測が減り、安心して話せるようになります。",
  },

  "自己主張ができない": {
    summary:
      "アサーション能力が低い状態で、日本文化では“調和重視”の影響により頻繁に見られる傾向です。",
    detail:
      "● 主張できないのは“能力がない”のではなく、対立を避けるための適応戦略であることが研究で示されています。\n" +
      "● 他者を尊重する姿勢は強みですが、自分のニーズが置き去りになりやすい点が課題です。\n\n" +
      "【改善ポイント】\n" +
      "✓ アサーティブトレーニングの“DESC法（Describe, Express, Specify, Choose）”は効果が実証されています。\n" +
      "✓ まずは低リスクな場面（店員への注文など）で自己主張を練習すると成功体験につながります。",
  },

  "周りに合わせすぎる": {
    summary:
      "社会心理学の“同調行動（Conformity）”が強く働くタイプで、過度の協調性が特徴です。",
    detail:
      "● Big Five の“調和性（Agreeableness）”が高い人は他者を優先しすぎる傾向があります。\n" +
      "● 人間関係は安定しやすい反面、自分の価値観や欲求が後回しになりやすいのが課題です。\n\n" +
      "【改善ポイント】\n" +
      "✓ 自分の価値観を明確化する“Value Clarification（Rokeach, 1973）”が効果的です。\n" +
      "✓ 「NOと言う前に3秒待つ」技法が、自律性を高めることが研究で示されています。",
  },

  "自己犠牲的": {
    summary:
      "スキーマ療法の“自己犠牲スキーマ（Young, 2003）”に類似し、境界線が弱い状態にあることが多いタイプです。",
    detail:
      "● 他者への配慮が強い反面、自分の疲労やニーズを後回しにしやすい傾向があります。\n" +
      "● Young のスキーマ理論では、罪悪感や見捨てられ不安が背景にある場合もあるとされます。\n\n" +
      "【改善ポイント】\n" +
      "✓ 境界線設定（Boundary Setting）の練習が重要で、自分と他者の責任を明確に分けることが効果的です。\n" +
      "✓ 毎日「今日、自分のためにしたこと」を1つ書き出す習慣が自己肯定感を高めます。",
  },

  "おせっかいで要求がましい": {
    summary:
      "外向性が高く、愛着理論の“不安型愛着（Anxious Attachment）”と関連する行動パターンが見られます。",
    detail:
      "● 他者との心理的距離が近くなりすぎる傾向があり、相手の反応に敏感です。\n" +
      "● 社会心理学では、孤独回避のために過度な関与や依存的行動が生まれると説明されています。\n\n" +
      "【改善ポイント】\n" +
      "✓ “一人で過ごす時間（Solitude Practice）”を増やすことで、自立性が高まり対人距離が安定します。\n" +
      "✓ セキュアな関係の特徴である“安定した待機（Secure Base Behavior）”を意識すると、相手の負担が減ります。",
  },
};


=======
      "『偉そうな人』と思われがち。周囲の注目を集めようとし過ぎる傾向があります。",
    detail:
      "● 自己愛が強く、自分が話の中心でいたいという気持ちが強いタイプです。\n" +
      "● 周囲の話を奪いやすく、無自覚に横柄な印象を与えがちです。\n" +
      "✅ 対策：共感力を意識して他人の話を最後まで聞く練習をしましょう。",
  },
  "執念深く自己中心的": {
    summary:
      "『怖い人』と思われがち。プライドが高く、相手を言い負かそうとする傾向があります。",
    detail:
      "● 勝つために手段を選ばないタイプで、感情表現が強めです。\n" +
      "● 自分の正しさを主張するあまり、相手に冷たく見られやすいです。\n" +
      "✅ 対策：一貫性を保ちながらも温かみを持って話す練習をしましょう。",
  },
  "冷淡でよそよそしい": {
    summary:
      "『冷たい人』と思われがち。人を信頼しづらく、共感的関係を築きにくい傾向があります。",
    detail:
      "● 他人の問題を『自分には関係ない』と感じやすいです。\n" +
      "● 感情表現が乏しく、思いやりを伝えづらいことも。\n" +
      "✅ 対策：小さな親切や声かけから共感力を育てましょう。",
  },
  "引っ込み思案": {
    summary:
      "『人嫌い』と思われがち。人前では無口になりがちで、誤解されやすいタイプです。",
    detail:
      "● 知らない人がいると黙ってしまう傾向があります。\n" +
      "● 実際には人嫌いではなく臆病なだけのことも多いです。\n" +
      "✅ 対策：少しずつ自己開示して、自分の感情を伝える練習をしましょう。",
  },
  "自己主張ができない": {
    summary:
      "『臆病な人』と思われがち。目立つことを避け、意見を言いづらいタイプです。",
    detail:
      "● 他人の話をよく聞く一方、自分の意見を出すのが苦手です。\n" +
      "● 目立たないことで誤解されることもあります。\n" +
      "✅ 対策：小さな場面から自分の考えを言う練習をしましょう。",
  },
  "周りに合わせすぎる": {
    summary:
      "『情けない人』と思われがち。人に合わせすぎて自分の意見を見失いやすいタイプです。",
    detail:
      "● 何でも許す優しさの反面、自己が弱く見えやすいです。\n" +
      "● 他人の影響を受けすぎる傾向も。\n" +
      "✅ 対策：自分の『本当にやりたいこと』を日記に書き出してみましょう。",
  },
  "自己犠牲的": {
    summary:
      "『恩着せがましい人』と思われがち。良い人すぎて自分を抑え込みやすいタイプです。",
    detail:
      "● 他人を優先しすぎて疲弊する傾向があります。\n" +
      "● 自分のニーズを抑え込み、怒りを溜めがちです。\n" +
      "✅ 対策：自分の欲望や疲労に正直になる練習をしましょう。",
  },
  "おせっかいで要求がましい": {
    summary:
      "『ずうずうしい人』と思われがち。他人への干渉が強く、距離感が近すぎるタイプです。",
    detail:
      "● 明るく社交的だが、プライベートに踏み込みすぎる傾向あり。\n" +
      "● 孤独を避けようとするため、他人に依存しやすいです。\n" +
      "✅ 対策：一人で過ごす時間を増やし、自己充足力を高めましょう。",
  },
};

>>>>>>> 99034967fc5d97ccab4c448a9837b3792b3e3a0f
export default function ResultPage() {
  const [data, setData] = useState<
    { name: string; avgScore: number; advice: string; detail: string }[]
  >([]);
  const [selected, setSelected] = useState<
    { name: string; avgScore: number; advice: string; detail: string } | null
  >(null);

  useEffect(() => {
    const stored = localStorage.getItem("resultData");
    if (stored) {
      const parsed: ResultData = JSON.parse(stored);
      const arr = parsed.categoryAverages || [];

      const formatted = arr.map((d, i) => ({
        name: TYPE_LABELS[i],
        avgScore: Number(d.avgScore ?? 0),
        advice: ADVICE_MAP[TYPE_LABELS[i]].summary,
        detail: ADVICE_MAP[TYPE_LABELS[i]].detail,
      }));

      setData(formatted);
    }
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-8 relative">
      <h1 className="text-2xl font-bold text-center mb-6">
        あなたの8カテゴリ平均スコア
      </h1>

      <div className="text-center mb-8 text-gray-700">
        <p>
          平均点が <strong>3.5点を超えたら改善が必要</strong> かもしれません。
        </p>
      </div>

      {/* レーダーチャート */}
      <div className="w-full h-[400px] mb-10">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <Radar
              dataKey="avgScore"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* カード一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((d, i) => (
          <motion.div
            key={i}
            className="border rounded-xl p-5 shadow-sm bg-white cursor-pointer hover:shadow-lg transition"
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelected(d)}
          >
            <h2 className="font-bold text-lg text-blue-700 mb-1">{d.name}</h2>
            <p className="text-sm text-gray-600 mb-1">
              平均スコア：{d.avgScore.toFixed(1)}
            </p>
            <p className="text-sm text-gray-800">{d.advice}</p>
          </motion.div>
        ))}
      </div>

      {/* モーダル表示 */}
      <AnimatePresence>
        {selected && (
          <>
            {/* 背景ぼかし */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            {/* モーダル本体 */}
            <motion.div
              className="fixed z-50 inset-0 flex items-center justify-center p-4"
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1, opacity: 0 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-6 max-w-lg w-full relative">
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-2 right-4 text-gray-500 hover:text-gray-800 text-xl"
                >
                  ×
                </button>
                <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">
                  {selected.name}
                </h2>
                <p className="text-gray-600 text-center mb-4">
                  平均スコア：{selected.avgScore.toFixed(1)}
                </p>
                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {selected.detail}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
<<<<<<< HEAD
  
      <div className="mt-12 text-center">
        <a
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          ホームに戻る
        </a>
      </div>

      <footer className="mt-16 text-sm text-gray-600 border-t pt-6">
  <h2 className="font-semibold mb-2">参考資料</h2>
  <ul className="list-disc list-inside space-y-1">
    <li>
      Rogers (1951) — 積極的傾聴の基礎
      
      <a
        href="https://psycnet.apa.org/doiLanding?doi=10.1037%2Fh0052805"
        className="text-blue-600 underline"
        target="_blank"
      >
        <p>Rogers, C. R. (1951). Client-Centered Therapy: Its Current Practice, Implications, and Theory. Boston: Houghton Mifflin.(APA PsycNet)</p>
        
      </a>
    </li>
    <li>
      Gordon (1970) — Iメッセージやアサーティブの基礎
      
      <a
        href="https://onlinelibrary.wiley.com/doi/10.1111/j.1545-5300.1974.253_2.x"
        className="text-blue-600 underline"
        target="_blank"
      >
        <p>Gordon, T. (1970). Parent Effectiveness Training (P.E.T.). New York: Wyden.(WILEY online Library)</p>
        
      </a>
    </li>
    <li>
      Brennan, Clark & Shaver (1998) — 成人愛着の決定的論文
      
      <a
        href="https://psycnet.apa.org/record/1997-36873-002"
        className="text-blue-600 underline"
        target="_blank"
      >
        <p>Brennan, K. A., Clark, C. L., & Shaver, P. R. (1998).Self-report measurement of adult attachment: An integrative overview.(APA PsycNet) </p>
        
      </a>
    </li>
    <li>
      Clark & Wells (1995) — 社会不安モデルの決定版
       
      <a
        href="https://onlinelibrary.wiley.com/doi/10.1002/9780470713020.ch8"
        className="text-blue-600 underline"
        target="_blank"
      >
        <p>Cognitive Therapy for Social Phobia (WILEY online Library)</p>
      </a>
    </li>
  </ul>
</footer>

<footer className="mt-16 text-sm text-gray-600 border-t pt-6">
  <h2 className="font-semibold mb-4">参考リソース</h2>

  <ul className="list-disc list-inside space-y-4">

    {/* Young のスキーマ理論 */}
      <a 
        href="https://www.schematherapy.com/" 
        target="_blank" 
        className="text-blue-600 underline"
      >
       Young のスキーマ理論（Schema Therapy）
      </a>

    {/* HEXACO 誠実‐謙虚性 */}
    
      <p className="font-semibold">HEXACO の誠実‐謙虚性（Honesty–Humility）</p>
      <p className="mb-1">
        HEXACO（6因子モデル）の1因子で、誠実性・謙虚さ・貪欲性の低さを示します。
      </p>
      <a 
        href="https://hexaco.org/" 
        target="_blank" 
        className="text-blue-600 underline"
      >
        人格の 6 つの主要な側面を評価するツールである HEXACO 人格目録改訂版に関する基本的な情報と資料について
      </a>
      <br />
      <a 
        href="https://psycnet.apa.org/record/2004-17529-007"
        target="_blank" 
        className="text-blue-600 underline"
      >
        Psychometric properties of the HEXACO personality inventory.（APA PsycNet）
      </a>
    

    {/* Active Listening */}
    
      <p className="font-semibold">積極的傾聴（Active Listening）</p>
      <p className="mb-1">
        Rogers（1951）が提唱した共感的コミュニケーション技法。相談支援の基礎となっている。
      </p>
      <a 
        href="https://positivepsychology.com/active-listening/" 
        target="_blank" 
        className="text-blue-600 underline"
      >
        https://positivepsychology.com/active-listening/
      </a>
    

    {/* Emotion Rating */}
    
      <p className="font-semibold">Emotion Rating（感情強度の数値化）</p>
      <p className="mb-1">
        ストレスを減らし、心を安定させる手法
      </p>
      <a 
        href="https://studyhacker.net/kanjou-nikki" 
        target="_blank" 
        className="text-blue-600 underline"
      >
        STUDY HACKER-「感情日記」を書いてみたら、常に頭の片隅にあった心配事がどんどん浄化されていった話-
      </a>
    

    {/* Adult Attachment */}
    
      <p className="font-semibold">愛着研究（Adult Attachment）</p>
      <p className="mb-1">
        成人の対人関係は「不安（Anxiety）」「回避（Avoidance）」の2軸で説明されます。
        不安型・回避型・安定型などの愛着スタイルがあります。
      </p>
      <a 
        href="https://psychologist.x0.com/terms/142.html" 
        target="_blank" 
        className="text-blue-600 underline"
      >
        心理学用語集: 愛着理論（Adult Attachment）
      </a>
    

    {/* Gradual Exposure */}
    
      <p className="font-semibold">段階的エクスポージャー（Gradual Exposure）</p>
      <p className="mb-1">
        不安や恐怖に段階的に慣れ、回避行動を減らす心理療法。
        社会不安・恐怖症の実証的治療法です。
      </p>
      <a 
        href="https://ctrinstitute.com/blog/how-to-use-gradual-exposure-to-treat-anxiety/"
        target="_blank" 
        className="text-blue-600 underline"
      >
        How to Use Gradual Exposure to Treat Anxiety (CTR Institute)
      </a>
    

    {/* DESC法 */}
    
      <p className="font-semibold">DESC法（アサーティブスキル）</p>
      <p className="mb-1">
        Describe（状況の描写）・Express（感情表現）・Specify（要求）・Choose（選択）。
        対立を避けつつ主張する方法。
      </p>
      <a 
        href="https://www.e-coms.co.jp/column/desc_method_assertive_communication" 
        target="_blank" 
        className="text-blue-600 underline"
      >
        DESC法とは？アサーティブコミュニケーションを実践するための活用例を解説(イー・コミュニケーションズ)
      </a>
    

    {/* アサーティブトレーニング */}
    
      <p className="font-semibold">アサーティブトレーニング</p>
      <p className="mb-1">
        攻撃的でも受動的でもなく、相手と自分を尊重するコミュニケーション方法。
      </p>
      <a 
        href="https://positivepsychology.com/assertive-communication/" 
        target="_blank" 
        className="text-blue-600 underline"
      >
        https://positivepsychology.com/assertive-communication/
      </a>
    

    {/* 境界線設定 */}
    
      <p className="font-semibold">境界線設定（Boundary Setting）</p>
      <p className="mb-1">
        健康的な対人距離を保ち、自己犠牲や依存を減らすスキル。
      </p>
      <a 
        href="https://positivepsychology.com/healthy-boundaries/"
        target="_blank" 
        className="text-blue-600 underline"
      >
        https://positivepsychology.com/healthy-boundaries/
      </a>
    

  </ul>
</footer>




=======
>>>>>>> 99034967fc5d97ccab4c448a9837b3792b3e3a0f
    </main>
  );
}
