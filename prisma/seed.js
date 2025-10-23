const { PrismaClient } = require("@prisma/client");
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

  { id: 9, text: "他者を信頼することが苦手である", category: 2 },
  { id: 10, text: "相手の人生の目標達成を支援することが苦手である", category: 2 },
  { id: 11, text: "他者の問題について、心から心配することが難しい", category: 2 },
  { id: 12, text: "自分の要求よりも，他者の要求を優先させることが苦手である", category: 2 },
  { id: 13, text: "人の幸せを快く思うことが難しい", category: 2 },
  { id: 14, text: "私は他者と争い過ぎる", category: 2 },
  { id: 15, text: "私は他者のことを疑い過ぎる", category: 2 },
  { id: 16, text: "私は他者に対して仕返しをしたいと思い過ぎる", category: 2 },

  { id: 17, text: "相手と長い期間にわたる関わりあいを持つことが苦手である", category: 3 },
  { id: 18, text: "他者に愛情を示すことが苦手である", category: 3 },
  { id: 19, text: "他者とうまくやっていくことが苦手である", category: 3 },
  { id: 20, text: "誰かに愛情を感じることが難しい", category: 3 },
  { id: 21, text: "他者に親密さを感じることが難しい", category: 3 },
  { id: 22, text: "他者に贈り物をすることが苦手である", category: 3 },
  { id: 23, text: "怒ったあと相手を許すことが難しい", category: 3 },
  { id: 24, text: "私は他者との距離をとり過ぎる", category: 3 },

  { id: 25, text: "グループに加わることが苦手である", category: 4 },
  { id: 26, text: "初対面の人に自分を紹介することが苦手である", category: 4 },
  { id: 27, text: "他者と社交的に付き合うことが苦手である", category: 4 },
  { id: 28, text: "他者に自分の感情を率直に表現することが難しい", category: 4 },
  { id: 29, text: "周りとの関係を築くために声をかけることが苦手である", category: 4 },
  { id: 30, text: "他者に対して、自分の心を開き気持ちを伝えることが苦手である", category: 4 },
  { id: 31, text: "私は他者と関わる際に怖がり過ぎる", category: 4 },
  { id: 32, text: "私は他者の前で恥ずかしいと感じ過ぎる", category: 4 },

  { id: 33, text: "自らの要求を他者に知らせることが苦手である", category: 5 },
  { id: 34, text: "自分をわずらわせるのを止めて欲しいと伝えることが苦手である", category: 5 },
  { id: 35, text: "問題が生じた時に、人と対決することが苦手である", category: 5 },
  { id: 36, text: "他者に対して自己主張することが苦手である", category: 5 },
  { id: 37, text: "上司のように上に立って指示を与えることが苦手である", category: 5 },
  { id: 38, text: "必要なときでも，他者に対して攻撃的になることが難しい", category: 5 },
  { id: 39, text: "必要な場合には断固とした態度をとることが苦手である", category: 5 },
  { id: 40, text: "他者と一緒にいる時に、自分に自信を感じることが難しい", category: 5 },

  { id: 41, text: "人に「No」と言うことが苦手である", category: 6 },
  { id: 42, text: "自分が怒っていることを、他者に伝えることが苦手である", category: 6 },
  { id: 43, text: "他者と言い合いをすることが苦手である", category: 6 },
  { id: 44, text: "他者に対して怒りを感じることが苦手である", category: 6 },
  { id: 45, text: "他者の気持ちを傷つけることを怖れずに自己主張することが苦手である", category: 6 },
  { id: 46, text: "私は他者の説得にあまりにも簡単に応じ過ぎる", category: 6 },
  { id: 47, text: "私はあまりにもだまされやすい", category: 6 },
  { id: 48, text: "私は他者によって利用され過ぎる", category: 6 },

  { id: 49, text: "他者に制限を課すことが苦手である", category: 7 },
  { id: 50, text: "好きな人に対して怒りを感じることが難しい", category: 7 },
  { id: 51, text: "誰かが苦しい生活をしている時に，自分は快適な暮らしのために精を出すことは難しい", category: 7 },
  { id: 52, text: "私は他者を喜ばせようとし過ぎる", category: 7 },
  { id: 53, text: "私は他者を信用し過ぎる", category: 7 },
  { id: 54, text: "私は自分の要求よりも他者の要求を優先し過ぎる", category: 7 },
  { id: 55, text: "私は他者に親切過ぎる", category: 7 },
  { id: 56, text: "私は他者の不幸に影響され過ぎる", category: 7 },

  { id: 57, text: "プライベートを他者に知られないようにすることが難しい", category: 8 },
  { id: 58, text: "ひとりで時間を過ごすことが苦手である", category: 8 },
  { id: 59, text: "人のおせっかいを焼かないでいることが難しい", category: 8 },
  { id: 60, text: "他者の問題の解決に責任を感じ過ぎる", category: 8 },
  { id: 61, text: "私は他者に心を開き過ぎる", category: 8 },
  { id: 62, text: "私は道化役（自分を笑いの種にする）を演じ過ぎる", category: 8 },
  { id: 63, text: "私は注目されたいと思い過ぎる", category: 8 },
  { id: 64, text: "私は他者に個人的な事柄をしゃべり過ぎる", category: 8 },
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
            { text: "あまり当てはまらない", value: 2 },
            { text: "どちらともいえない", value: 3 },
            { text: "やや当てはまる", value: 4 },
            { text: "全くあてはまる", value: 5 },
          ],
        },
      },
    });
  }
  console.log("✅ 64問の質問データを登録しました！");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
