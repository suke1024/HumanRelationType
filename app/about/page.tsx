"use client";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f0f7ff] to-[#fff] text-gray-800 font-sans px-6 md:px-16 py-16">
      <section className="max-w-4xl mx-auto">
        {/* タイトル */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-10 text-blue-700"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          人間関係診断とは？
        </motion.h1>

        {/* 導入 */}
        <motion.p
          className="text-lg leading-relaxed mb-10 text-center text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          「HumanRelationType」診断は、心理学者 Wiggins（1988）らによって提唱された
          <strong>対人円環モデル（Interpersonal Circumplex Model）</strong>を基礎にした性格診断です。
          <br />
          このモデルでは、あなたの人間関係における態度や関わり方を「2つの軸」で分析します。
        </motion.p>

        {/* 理論説明カード */}
        <motion.div
          className="bg-white/80 backdrop-blur-md border border-blue-100 rounded-2xl shadow-lg p-8 mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            対人円環モデルとは
          </h2>
          <p className="leading-relaxed text-gray-700 mb-4">
            対人円環モデル（Interpersonal Circumplex）は、
            <strong>Dominance（支配性）</strong> と
            <strong>Love（親和性）</strong> の2軸から成る心理構造です。
            <br />
            - 縦軸のは「主導的か、従属的か」
            <br />  
            - 横軸のは「温かいか、冷たいか」  
            <br />
            この2軸を組み合わせることで、人の対人スタイルを下記の8つのタイプに分類できます。
          </p>

    {/*
        図示（円環イメージ）
        <div className="flex justify-center my-8">
            <img
                src="/circumplex-model.png"
                alt="Interpersonal Circumplex Model"
                className="w-[320px] md:w-[400px] rounded-xl shadow-md"
            />
        </div>
    */}
    
          <p className="text-gray-700 leading-relaxed">
            これらのタイプは単なる性格分類ではなく、
            <strong>「他者との関わり方の傾向」</strong>を表します。
            <br />
            つまり、人との関係の中で
            「どれくらい自分を主張するか」「どれくらい相手を受け入れるか」
            というバランスの違いを示すのです。
          </p>
        </motion.div>

        {/* 8タイプ解説概要 */}
        <motion.div
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 shadow-inner"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center">
            人間関係スタイルの8分類
          </h2>
          <p className="text-gray-700 mb-6 text-center">
            IAS-R（Interpersonal Adjective Scales - Revised）では、
            対人関係を8つのスタイルに分類します。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ["横柄で支配的", "支配的で自己中心的な傾向。共感力を養うことが鍵。"],
              ["執念深く自己中心的", "プライドが高く、攻撃的になりやすい。柔らかい言葉遣いを意識。"],
              ["冷淡でよそよそしい", "感情を表に出しづらく、距離を置きがち。思いやりの行動を増やそう。"],
              ["引っ込み思案", "人見知りで関係構築に時間がかかる。少しずつ自己開示を。"],
              ["自己主張できない", "自分の意見を我慢しやすい。小さな発言から練習を。"],
              ["周りに合わせすぎる", "他人に流されやすい。自分のニーズを把握することが重要。"],
              ["自己犠牲的", "他人を優先しすぎて疲弊しやすい。自分のケアも忘れずに。"],
              ["おせっかいで要求がましい", "他人への干渉が強い。孤独を楽しむ時間を持とう。"],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="p-5 bg-white rounded-xl shadow-md border border-blue-100 hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-blue-600 mb-1">{title}</h3>
                <p className="text-gray-700 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* まとめ */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            この診断の目的
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
            「HumanRelationType」は、あなたの人間関係における傾向を知るための自己理解ツールです。
            <br />
            結果は「良い・悪い」を判断するものではなく、
            <strong>より良い人間関係を築くためのヒント</strong>を提供します。
          </p>
        </motion.div>
      </section>
    </main>
  );
}
