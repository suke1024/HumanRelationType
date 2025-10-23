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
    </main>
  );
}
