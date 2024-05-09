"use client";

import { useState } from "react";
import { useActions, useUIState } from "ai/rsc";
import { GenerativeInput } from "generative-components";

import type { AI } from "~/app/actions";

export function Playground() {
  const [inputValue, setInputValue] = useState<string>("");
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions<typeof AI>();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 pb-48 font-light tracking-wide text-white md:p-12">
        {messages.map((message) => (
          <div key={message.id}>{message.display}</div>
        ))}
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          // Add user message to UI state
          setMessages(
            (currentMessages): { id: number; display: React.ReactNode }[] => [
              ...currentMessages,
              {
                id: Date.now(),
                display: <div>{inputValue}</div>,
              },
            ],
          );

          // Submit and get response message
          const responseMessage = (await submitUserMessage(inputValue)) as {
            id: number;
            display: React.ReactNode;
          };
          setMessages(
            (currentMessages): { id: number; display: React.ReactNode }[] => [
              ...currentMessages,
              responseMessage,
            ],
          );

          setInputValue("");
        }}
      >
        <div className="fixed bottom-12 left-[50%] flex w-full max-w-2xl -translate-x-[50%] justify-center px-12">
          <GenerativeInput
            placeholder={"What do you need?"}
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
          />
        </div>
      </form>
    </div>
  );
}
