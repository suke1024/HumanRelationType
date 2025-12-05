"use client";
import { useState } from "react";
import questions from "@/data/question.json";
import { useRouter } from "next/navigation";

export default function QuizPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const total = questions.length;
  const q = questions[index];

  const select = (val: number) => {
    const next = [...answers];
    next[index] = val;
    setAnswers(next);
  };

  const next = () => {
    if (index < total - 1) {
      setIndex(i => i + 1);
    } else {
      // 仮の診断結果（あとでロジック追加予定）
      const code = "ENTP";
      router.push(`/result/${code}`);
    }
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold mb-2">
        Q{index + 1}/{total}
      </h2>
      <p className="mb-4">{q.text}</p>

      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4, 5].map(v => (
          <button
            key={v}
            onClick={() => select(v)}
            className={`px-3 py-2 border rounded ${
              answers[index] === v ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          disabled={index === 0}
          onClick={() => setIndex(i => i - 1)}
          className="px-4 py-2 border rounded"
        >
          戻る
        </button>
        <button
          onClick={next}
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          {index < total - 1 ? "次へ" : "結果を見る"}
        </button>
      </div>
    </main>
  );
}
