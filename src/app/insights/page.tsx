import Insights from "@/components/Insights";

export const metadata = {
  title: "Insights",
  description: "Articles and thought leadership on specialty coffee, software engineering, and global living by Masaki Kono.",
};

export default function InsightsPage() {
  return (
    <main className="flex-1 w-full flex flex-col pt-24 pb-12">
      <Insights />
    </main>
  );
}
