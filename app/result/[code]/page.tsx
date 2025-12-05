import ClientResultPage from "./ClientResultPage";

type PageProps = {
  params: Promise<{ code: string }>;
};

export default async function ResultPage({ params }: PageProps) {
  const { code } = await params;

  // code は /result/ENTP の "ENTP" のような文字列が入る
  return <ClientResultPage code={code} />;
}
