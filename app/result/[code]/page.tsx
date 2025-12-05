type Props = { params: { code: string } };

const RESULTS: Record<string, { title: string; desc: string }> = {
  ENTP: { title: "討論者タイプ", desc: "アイデアを出すのが得意で、自由を重視します。" },
  INFJ: { title: "提唱者タイプ", desc: "直感的で理想主義。人の成長を支えるのが得意です。" },
};

export default function ResultPage({ params: { code } }: Props) {
  const info = RESULTS[code] ?? { title: "診断結果", desc: "このタイプの情報はまだありません。" };
  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{info.title}</h1>
      <p className="mb-4">{info.desc}</p>
      <a href="/quiz" className="inline-block px-4 py-2 border rounded">
        もう一度診断
      </a>
    </main>
  );
}
