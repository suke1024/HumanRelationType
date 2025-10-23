"use client";
import { useRouter } from "next/navigation";

const TYPES = [
  { id: 1, name: "横柄で支配的", desc: "他人の注目を集めようとしすぎるタイプ" },
  { id: 2, name: "執念深く自己中心的", desc: "プライドが高く、他人を言い負かしがちなタイプ" },
  { id: 3, name: "冷淡でよそよそしい", desc: "人を信じにくく、感情を表に出さないタイプ" },
  { id: 4, name: "引っ込み思案", desc: "人見知りが強く、話しかけられにくいタイプ" },
  { id: 5, name: "自己主張ができない", desc: "自分の意見を控えがちなタイプ" },
  { id: 6, name: "周りに合わせすぎる", desc: "他人に流されやすい優しいタイプ" },
  { id: 7, name: "自己犠牲的", desc: "他人を優先しすぎて疲れやすいタイプ" },
  { id: 8, name: "おせっかいで要求がましい", desc: "他人に干渉しすぎてしまうタイプ" },
];

export default function TypesPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f0f7ff] to-[#fdfdff] py-20 font-sans">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          8つのタイプについて
        </h1>
        <p className="text-gray-600 mb-12">
          あなたの診断結果に出てくる8つのタイプの概要です。気になるタイプをクリックして詳細を見てみましょう。
        </p>

        {/* カードグリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {TYPES.map((t) => (
            <div
              key={t.id}
              onClick={() => router.push(`/types/${t.id}`)}
              className="bg-white shadow-lg rounded-2xl p-8 cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-300 border border-blue-50"
            >
              <h2 className="text-xl font-semibold text-blue-700 mb-3">
                {t.id}. {t.name}
              </h2>
              <p className="text-gray-600">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* ホームに戻るボタン */}
        <button
          onClick={() => router.push("/")}
          className="mt-16 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition"
        >
          ← ホームに戻る
        </button>
      </div>
    </main>
  );
}
