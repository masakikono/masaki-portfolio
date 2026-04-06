import Insights from "@/components/Insights";

export const metadata = {
  title: "Insights | Masaki Kono",
  description: "Thought Leadership and Writings",
};

export default function InsightsPage() {
  return (
    <main className="flex-1 w-full flex flex-col pt-24 pb-12">
      <Insights />
    </main>
  );
}
