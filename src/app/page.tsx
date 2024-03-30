"use client"

import { useState } from 'react';
import { ChatInput } from "@/components/chat-input";
import { FaGithub } from "react-icons/fa"
import { StateToggle } from "../components/state-toggle"
import Link from "next/link";
import { type State, states } from "../components/chat-input"

export default function Home() {

  const [controlledState, setControlledState] = useState<State | undefined>("idle");

  return (
    <main className="flex min-h-screen h-screen flex-col items-center justify-center p-8 bg-[#101010]">
      <ChatInput
        value=""
        placeholder={"What do you need?"}
        controlledState={controlledState}
        onStateChange={(newState) => setControlledState(newState)}
      />
      <div className="flex flex-col justify-start my-24 mx-auto w-[650px] max-w-full">
        <p className="text-white font-light text-sm mb-2 tracking-wide">Chat Input</p>
        <p className="text-[#888] font-light text-sm tracking-wide">A chat input for interacting with language models. Subtle animations indicate the current state of the model.</p>
        <hr className="my-16 border-[#333] border-opacity-50" />
        <div className="flex flex-row flex-wrap gap-16 justify-between text-white">

            <StateToggle
              states={states as readonly State[]}
              activeState={controlledState ?? 'idle'}
              onStateChange={setControlledState}
            />

          <div className="flex flex-row-reverse md:flex-row justify-end items-center gap-4 tracking-wide w-full md:w-fit">
            <span className='text-xs font-light'>Built by <Link href={'https://twitter.com/danielsims'}>danielsims</Link></span>
            <Link href={'https://github.com/danielsims/chat-ui'}><FaGithub className="text-white fill-white" size={24} /></Link>
          </div>
        </div>
      </div>
    </main>
  );
}
