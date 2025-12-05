import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { answers } = await req.json();

  const categoryScores: Record<number, number[]> = {};

  answers.forEach((ans: { questionId: number; value: number }) => {
    const category = Math.floor((ans.questionId - 1) / 8) + 1;
    if (!categoryScores[category]) categoryScores[category] = [];
    categoryScores[category].push(ans.value);
  });

  const categoryAverages = Object.entries(categoryScores).map(([cat, values]) => {
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    return { category: Number(cat), avgScore: avg };
  });

  return NextResponse.json({ categoryAverages });
}
