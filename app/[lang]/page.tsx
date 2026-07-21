import { notFound } from "next/navigation";
import { FamilyPage } from "../FamilyPage";
import { isLanguage } from "../i18n";

export default async function LocalizedHome({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();

  return <FamilyPage language={lang} />;
}
