import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Page not found | الصفحة غير موجودة",
  robots: { index: false, follow: true },
};

export default function MissingLocalizedRoute() {
  notFound();
}
