import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const QUESTIONS = [
  { id: 1, text: "相手の見解に理解を示すことが苦手である", category: 1 },
  { id: 2, text: "上の人の指示に従うことが苦手である", category: 1 },
  { id: 3, text: "私は自分の思い通りにやり過ぎる", category: 1 },
  { id: 4, text: "私は他者に対して攻撃的過ぎる", category: 1 },
  { id: 5, text: "私は他者をコントロールしようとし過ぎる", category: 1 },
  { id: 6, text: "私は他者を変えようとし過ぎる", category: 1 },
  { id: 7, text: "私は自分が望む方向へと、他者を操作し過ぎる", category: 1 },
  { id: 8, text: "私は他者と口論し過ぎる", category: 1 },
];

async function main() {
  for (const q of QUESTIONS) {
    await prisma.question.upsert({
      where: { id: q.id },
      update: {},
      create: {
        id: q.id,
        text: q.text,
        category: q.category,
        choices: {
          create: [
            { text: "全くあてはまらない", value: 1 },
            { text: "あてはまらない", value: 2 },
            { text: "どちらともいえない", value: 3 },
            { text: "あてはまる", value: 4 },
            { text: "非常にあてはまる", value: 5 },
          ],
        },
      },
    });
  }
}

main()
  .then(() => console.log("✅ 質問データを登録しました"))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
