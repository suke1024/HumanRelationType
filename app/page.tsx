"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-[#c7e8f3] to-[#f6f9fc]">
      {/* --- ナビゲーションバー --- */}
      <nav className="w-full flex justify-between items-center px-10 py-6 bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 z-50">
        <h1 className="text-2xl font-bold text-gray-800">
          HumanRelationType
        </h1>
        <div className="space-x-8 text-gray-700 font-medium">
          <button
            onClick={() => router.push("/about")}
            className="hover:text-blue-600 transition"
          >
            人間関係診断とは
          </button>
          <button
            onClick={() => router.push("/types")}
            className="hover:text-blue-600 transition"
          >
            8 Typeについて
          </button>
        </div>
      </nav>

      {/* --- メインビジュアル --- */}
      <section className="flex flex-col justify-center items-center flex-grow text-center px-6 mt-32">
        {/* タイトル部分 */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          無料・性格診断テスト
        </motion.h2>

        <motion.h3
          className="text-5xl md:text-6xl font-extrabold text-blue-600 mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Human Relation Type
        </motion.h3>

        <motion.p
          className="text-gray-700 max-w-2xl text-lg md:text-xl mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          あなたの人間関係スタイルを診断してみましょう！<br />
          周囲との関わり方から、あなたの人付き合いタイプを8分類で分析します。
        </motion.p>

        {/* 診断ボタン */}
        <motion.button
          onClick={() => router.push("/test")}
          className="px-8 py-4 bg-blue-600 text-white text-lg md:text-xl font-semibold rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          診断を始める →
        </motion.button>
      </section>

      {/* --- フッター --- */}
      <footer className="text-center text-gray-500 py-6 text-sm">
        © 2025 HumanRelationType. All rights reserved.
      </footer>
    </main>
  );
}
