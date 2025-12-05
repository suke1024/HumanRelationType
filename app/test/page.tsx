"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TestPage() {
  const router = useRouter();
  const totalQuestions = 64;

  // 質問リスト（実データ）
  const questionTexts = [
    "相手の見解に理解を示すことが苦手である",
    "上の人の指示に従うことが苦手である",
    "私は自分の思い通りにやり過ぎる",
    "私は他者に対して攻撃的過ぎる",
    "私は他者をコントロールしょうとし過ぎる",
    "私は他者を変えようとし過ぎる",
    "私は自分が望む方向へと、他者を操作し過ぎる",
    "私は他者と口論し過ぎる",
    "他者を信頼することが苦手である",
    "相手の人生の目標達成を支援することが苦手である",
    "他者の問題について、心から心配することが難しい",
    "自分の要求よりも，他者の要求を優先させることが苦手である",
    "人の幸せを快く思うことが難しい",
    "私は他者と争い過ぎる",
    "私は他者のことを疑い過ぎる",
    "私は他者に対して仕返しをしたいと思い過ぎる",
    "相手と長い期間にわたる関わりあい（コミット）を持つことが苦手である",
    "他者に愛情を示すことが苦手である",
    "他者とうまくやっていくことが苦手である",
    "誰かに愛情を感じることが難しい",
    "他者に親密さを感じることが難しい",
    "他者に贈り物をすることが苦手である",
    "怒ったあと相手を許すことが難しい",
    "私は他者との距離をとり過ぎる",
    "グループに加わることが苦手である",
    "初対面の人に、自分を紹介することが苦手である",
    "他者と社交的に付き合うことが苦手である",
    "他者に自分の感情を率直に表現することが難しい",
    "周りとの関係を築くために声をかけることが苦手である",
    "他者に対して、自分の心を開き、気持ちを伝えることが苦手である",
    "私は他者と関わる際に怖がり過ぎる",
    "私は他者の前で恥ずかしいと感じ過ぎる",
    "自らの要求を他者に知らせることが苦手である",
    "自分をわずらわせるのを止めて欲しいと，他者に伝えることが苦手である",
    "問題が生じた時に、人と対決することが苦手である",
    "他者に対して自己主張することが苦手である",
    "上司のように上に立って指示を与えることが苦手である",
    "必要なときでも，他者に対して攻撃的になることが難しい",
    "必要な場合には、断固とした態度をとることが苦手である",
    "他者と一緒にいる時に、自分に自信を感じることが難しい",
    "人に「No」と言うことが苦手である",
    "自分が怒っていることを、他者に伝えることが苦手である",
    "他者と言い合いをすることが苦手である",
    "他者に対して怒りを感じることが苦手である",
    "他者の気持ちを傷つけることを怖れずに、自己主張することが苦手である",
    "私は他者の説得にあまりにも簡単に応じ過ぎる",
    "私はあまりにもだまされやすい",
    "私は他者によって利用され過ぎる",
    "他者に制限を課すことが苦手である",
    "好きな人に対して怒りを感じることが難しい",
    "誰かが苦しい生活をしている時に，自分は快適な春らしのために精を出すことは難しい",
    "私は他者を喜ばせようとし過ぎる",
    "私は他者を信用し過ぎる",
    "私は自分の要求よりも他者の要求を優先し過ぎる",
    "私は他者に親切過ぎる",
    "私は他者の不幸に形響され過ぎる",
    "プライベートを他者に知られないようにすることが難しい",
    "ひとりで時間を過ごすことが苦手である",
    "人のおせっかいを焼かないでいることが難しい",
    "他者の問題の解決に，私は責任を感じ過ぎる",
    "私は他者に心を開き過ぎる",
    "私は道化役（自分を笑いの種にする）を演じ過ぎる",
    "私は注目されたいと思い過ぎる",
    "私は他者に個人的な事柄をしゃべり過ぎる",
  ];

  // 質問オブジェクト生成（カテゴリー1〜8割り当て）
  const questions = questionTexts.map((text, i) => ({
    id: i + 1,
    text,
    category: Math.floor(i / 8) + 1,
  }));

  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(totalQuestions).fill(0));

  const questionsPerPage = 10;
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);

  const handleAnswer = (index: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleSubmit = async () => {
    const formattedAnswers = questions.map((q) => ({
      questionId: q.id,
      value: answers[q.id - 1],
    }));

    try {
      const res = await fetch("/api/result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: formattedAnswers }),
      });

      const data = await res.json();
      localStorage.setItem("resultData", JSON.stringify(data));

      alert("診断結果へ進みます！");
      setTimeout(() => {
        router.push("/result");
      }, 100);
    } catch (e) {
      alert("結果の計算でエラーが発生しました");
      console.error(e);
    }
  };

  const startIndex = page * questionsPerPage;
  const endIndex = Math.min(startIndex + questionsPerPage, totalQuestions);
  const currentQuestions = questions.slice(startIndex, endIndex);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#eaf6ff] to-[#fefcff] flex flex-col items-center font-sans">
      <header className="w-full fixed top-0 bg-white/80 backdrop-blur-md shadow-sm z-50 flex justify-between items-center px-8 py-4">
        <button
          onClick={() => router.push("/")}
          className="text-xl font-bold text-gray-800 hover:text-blue-600 transition"
        >
          HumanRelationType
        </button>
        <span className="text-gray-500 text-sm">
          {startIndex + 1}〜{endIndex}問 / {totalQuestions}問
        </span>
      </header>

      <div className="mt-24 w-full max-w-3xl px-6">
        <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
          <div
            className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${((endIndex) / totalQuestions) * 100}%` }}
          />
        </div>

        {currentQuestions.map((q) => (
          <div
            key={q.id}
            className="bg-white shadow-lg rounded-2xl p-6 mb-6 border border-blue-50"
          >
            <h2 className="text-base font-medium text-gray-800 mb-5">
              {q.id}. {q.text}
            </h2>

            <div className="flex justify-between items-center px-4">
              <span className="text-sm text-gray-600">全くあてはまらない</span>
              <div className="flex gap-4">
                {[1, 2, 3, 4, 5].map((num) => (
                  <label key={num} className="cursor-pointer">
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      checked={answers[q.id - 1] === num}
                      onChange={() => handleAnswer(q.id - 1, num)}
                      className="hidden peer"
                    />
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all" />
                  </label>
                ))}
              </div>
              <span className="text-sm text-gray-600">全くあてはまる</span>
            </div>
          </div>
        ))}

        <div className="flex justify-between mt-10">
          <button
            onClick={handlePrev}
            disabled={page === 0}
            className={`px-8 py-3 rounded-full font-semibold shadow-md transition ${
              page === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            ← 前のページ
          </button>

          {page === totalPages - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-md transition"
            >
              診断結果へ →
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-md transition"
            >
              次の10問へ →
            </button>
          )}
        </div>
      </div>

      <footer className="text-gray-500 text-sm mt-auto mb-4">
        © 2025 HumanRelationType
      </footer>
    </main>
  );
}
