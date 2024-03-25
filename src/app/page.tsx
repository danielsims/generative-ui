import { ChatInput } from "@/components/chat-input";

export default function Home() {
  return (
    <main className="flex min-h-screen h-screen flex-col items-center justify-center p-8 bg-[#101010]">
        <ChatInput />

        <div className="flex flex-col justify-start my-24 mx-auto w-[650px] max-w-full">
        <p className="text-white font-light text-sm mb-2 tracking-wide">Chat Input</p>
        <p className="text-[#888] font-light text-sm tracking-wide">A chat input for interacting with language models. Subtle animations indicate the current state of the model.</p>
      </div>

    </main>
  );
}
