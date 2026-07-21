import type { Metadata } from "next";
import { FamilyPage } from "./FamilyPage";

export const metadata: Metadata = {
  title: "El Shafey Family | Professional Consultants",
  description:
    "Meet the El Shafey family and discover professional expertise in spinning and weaving, international law, HVAC consulting, UX design and research, and digital marketing.",
};

export default function Home() {
  return <FamilyPage />;
}
