"use client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

const TYPE_DETAILS:Record<string,{
  title: string;
  color: string;
  image: string;
  summary: string;
  section1: string;
  section2: string;
  advice: string;
}> = {
  1: {
    title: "横柄で支配的",
    color: "#3B82F6",
    image: "/types/type1.png",
    summary:
      "自分が中心でありたいという欲求が強く、周囲の注目を集めようとするタイプです。",
    section1:
      "自信にあふれリーダーシップを取る反面、相手をコントロールしたい欲が出やすい傾向があります。",
    section2:
      "共感力を持って他人の話を聞くことで、より円滑な人間関係が築けます。周囲の意見を尊重する姿勢を大切にしましょう。",
    advice:
      "意識的に「聞く力」を高めましょう。柔軟に人の意見を受け入れることが信頼につながります。",
  },
  2: {
    title: "執念深く自己中心的",
    color: "#F97316",
    image: "/types/type2.png",
    summary:
      "強い信念と競争心を持ち、相手に負けたくないという気持ちが強いタイプです。",
    section1:
      "プライドが高く、自分の考えを曲げない傾向がありますが、正義感が強く責任感もあります。",
    section2:
      "人を説得する力がありますが、相手の意見を受け入れる柔軟性を持つことでより信頼を得られます。",
    advice:
      "相手の立場を尊重する習慣をつけましょう。強さを見せるよりも、理解を示す方が関係は長続きします。",
  },
  3: {
    title: "冷淡でよそよそしい",
    color: "#64748B",
    image: "/types/type3.png",
    summary:
      "人に深入りせず、冷静で客観的に物事を見つめる傾向があります。",
    section1:
      "人との距離を一定に保ち、自分の世界を大切にするタイプです。",
    section2:
      "他人に無関心と誤解されやすいため、意識的に感謝や関心を示すことで印象が良くなります。",
    advice:
      "「ありがとう」や「お疲れ様」などの一言を増やしてみましょう。あなたの誠実さが伝わります。",
  },
  4: {
    title: "引っ込み思案",
    color: "#60A5FA",
    image: "/types/type4.png",
    summary:
      "控えめで慎重な性格。自分の意見を主張するよりも周囲を見守るタイプです。",
    section1:
      "周りの人を気遣う優しさがありますが、時に自分の意見を隠してしまう傾向があります。",
    section2:
      "自分を表現する勇気を少しずつ持つことで、人間関係が深まりやすくなります。",
    advice:
      "「小さな発言」から始めましょう。あなたの誠実な意見は周りに良い影響を与えます。",
  },
  5: {
    title: "自己主張できない",
    color: "#22D3EE",
    image: "/types/type5.png",
    summary:
      "他人に気を使いすぎて、自分の意見を我慢してしまうタイプです。",
    section1:
      "対立を避ける傾向がありますが、誠実で協調性に富んでいます。",
    section2:
      "自分の考えを伝える練習をすることで、関係がより健全になります。",
    advice:
      "「No」と言う練習をしてみましょう。断ることも優しさの一つです。",
  },
  6: {
    title: "周りに合わせすぎる",
    color: "#10B981",
    image: "/types/type6.png",
    summary:
      "他人の気持ちを最優先し、自分を後回しにする傾向があります。",
    section1:
      "人に合わせすぎることで疲れてしまうことも。自己理解を深めることが大切です。",
    section2:
      "相手を思いやる優しさは長所ですが、自分の意見も尊重して良いのです。",
    advice:
      "1日1回「自分はどう思う？」と自問する習慣をつけてみましょう。",
  },
  7: {
    title: "自己犠牲的",
    color: "#EAB308",
    image: "/types/type7.png",
    summary:
      "人のために尽くすことが得意で、献身的なサポートタイプです。",
    section1:
      "思いやりがあり、仲間に信頼される存在。ただし、頑張りすぎには注意です。",
    section2:
      "相手に合わせるばかりでなく、自分の時間も大切にしましょう。",
    advice:
      "人を助けるとき、「自分も楽しいか？」を考えてみましょう。無理をしすぎないことが大切です。",
  },
  8: {
    title: "おせっかいで要求がましい",
    color: "#EC4899",
    image: "/types/type8.png",
    summary:
      "明るく社交的で、周囲を盛り上げるムードメーカータイプです。",
    section1:
      "行動力があり、誰とでも仲良くなれる反面、干渉しすぎることもあります。",
    section2:
      "相手のペースを尊重することで、より信頼される関係を築けます。",
    advice:
      "「聞き役」になる日を作ってみましょう。人とのバランスがぐっと良くなります。",
  },
};

export default function TypeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const data = TYPE_DETAILS[id.toString()];

  if (!data)
    return (
      <main className="h-screen flex items-center justify-center text-gray-500">
        <p>タイプが見つかりません。</p>
      </main>
    );

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center text-center 
      font-['Noto_Sans_JP'] px-6"
      style={{
        background: `linear-gradient(to bottom, ${data.color}20, white)`,
        color: "#1E3A8A",
      }}
    >
      {/* タイトル部分 */}
      <div className="max-w-2xl">
        <Image
          src={data.image}
          alt={data.title}
          width={120}
          height={120}
          className="mx-auto mb-6"
        />
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          {data.title}
        </h1>
        <p className="text-lg sm:text-xl text-[#1E40AF] font-medium mb-10 leading-relaxed">
          {data.summary}
        </p>
      </div>

      {/* コンテンツ */}
      <div className="max-w-3xl text-[#334155] leading-relaxed">
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3">基本性格</h2>
          <p>{data.section1}</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3">人間関係の特徴</h2>
          <p>{data.section2}</p>
        </section>

        <section
          className="rounded-2xl p-6 mt-10 shadow-sm"
          style={{
            backgroundColor: `${data.color}15`,
            border: `1px solid ${data.color}40`,
          }}
        >
          <h3 className="text-xl font-semibold mb-2">💡 アドバイス</h3>
          <p>{data.advice}</p>
        </section>
      </div>

      {/* 戻るボタン */}
      <div className="mt-16">
        <button
          onClick={() => router.push("/types")}
          className="px-8 py-3 text-white font-semibold rounded-full shadow-md hover:opacity-90 transition-all"
          style={{ backgroundColor: data.color }}
        >
          ← タイプリストへ戻る
        </button>
      </div>
    </main>
  );
}
