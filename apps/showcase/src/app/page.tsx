"use client";

import type { ChatInputStates } from "generative-components";
import { useState } from "react";
import Link from "next/link";
import { ChatInput, chatInputStates } from "generative-components";
import { FaGithub } from "react-icons/fa";

import { StateToggle } from "../components/state-toggle";

export default function Home() {
  const [controlledValue, setControlledValue] = useState<string>("");
  const [controlledState, setControlledState] = useState<
    ChatInputStates | undefined
  >("idle");

  return (
    <main className="flex h-screen min-h-screen flex-col items-center justify-center bg-[#101010] p-8">
      <ChatInput
        value={controlledValue}
        controlledState={controlledState}
        placeholder={"What do you need?"}
        onChange={(event) => setControlledValue(event.target.value)}
        onStateChange={(newState) => setControlledState(newState)}
      />
      <div className="mx-auto my-24 flex w-[650px] max-w-full flex-col justify-start">
        <p className="mb-2 text-sm font-light tracking-wide text-white">
          Chat Input
        </p>
        <p className="text-sm font-light tracking-wide text-[#888]">
          A chat input for interacting with language models. Subtle animations
          indicate the current state of the model.
        </p>
        <hr className="my-16 border-[#333] border-opacity-50" />
        <div className="flex flex-row flex-wrap justify-between gap-16 text-white">
          <StateToggle
            states={chatInputStates as readonly ChatInputStates[]}
            activeState={controlledState ?? "idle"}
            onStateChange={setControlledState}
          />

          <div className="flex w-full flex-row-reverse items-center justify-end gap-4 tracking-wide md:w-fit md:flex-row">
            <span className="text-xs font-light">
              Built by{" "}
              <Link href={"https://twitter.com/danielsims"}>danielsims</Link>
            </span>
            <Link href={"https://github.com/danielsims/generative-ui"}>
              <FaGithub className="fill-white text-white" size={24} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
