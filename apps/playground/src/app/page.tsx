import { Playground } from "~/components/playground";

export default function Home() {
  return (
    <main className="flex h-screen min-h-screen flex-col items-center justify-center bg-[#101010] p-8">
      <Playground />
    </main>
  );
}
