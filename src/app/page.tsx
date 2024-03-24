import { ChatInput } from "@/components/chat-input";

export default function Home() {
  return (
    <main className="flex min-h-screen h-screen flex-col items-center justify-center p-8 bg-[#111111]">
        <ChatInput />

        <div className="flex flex-col justify-start my-24 mx-auto w-[650px] max-w-full">
        <h3 className="text-white mb-2">Chat Input</h3>
        <p className="text-[#888]">A chat input for interacting with language models. Subtle animations indicate the current state of the model.</p>
      </div>

    </main>
  );
}
