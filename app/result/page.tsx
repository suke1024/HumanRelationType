import ClientResultPage from "./ClientResultPage";

// Next.js 15 の正しい型定義
export default async function Page(props: {
  params: Promise<{ code: string }>;
}) {
  // params を await で取り出す
  const { code } = await props.params;

  return <ClientResultPage code={code} />;
}
