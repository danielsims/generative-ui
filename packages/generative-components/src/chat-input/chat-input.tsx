import type { ChangeEvent } from "react";
import React, { useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { Particles } from "./particles";

interface ChatInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  placeholder: string;
  controlledState?: ChatInputStates;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onStateChange?: (state: ChatInputStates) => void;
}

export const chatInputStates = [
  "idle",
  "focus",
  "typing",
  "loading",
  "error",
] as const;
export type ChatInputStates = (typeof chatInputStates)[number];

export const ChatInput = ({
  value,
  placeholder,
  controlledState,
  onChange,
  onStateChange,
  ...rest
}: ChatInputProps) => {
  const [internalState, setInternalState] = useState<ChatInputStates>("idle");
  const [internalPlaceholder, setInternalPlaceholder] =
    useState<string>(placeholder);
  const currentState = controlledState ?? internalState;

  const changeState = useCallback(
    (newState: ChatInputStates) => {
      if (controlledState === undefined) {
        setInternalState(newState);
      }
      onStateChange?.(newState);
    },
    [controlledState, onStateChange],
  );

  const debouncedTypingToFocus = useDebouncedCallback(() => {
    changeState("focus");
  }, 900);

  const handleFocus = () => {
    setInternalPlaceholder("");
    changeState("focus");
  };

  const handleBlur = () => {
    setInternalPlaceholder(placeholder);
    changeState("idle");
  };

  const handleInput = useCallback(() => {
    changeState("typing");
    debouncedTypingToFocus();
  }, [changeState, debouncedTypingToFocus]);

  const inputProps = {
    value: value,
    placeholder: internalPlaceholder,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onInput: handleInput,
    onChange: onChange,
    ...rest,
  };

  return (
    <div className="shadow-inner-shadow-dark-sm flex h-[56px] w-full max-w-2xl items-center justify-center gap-2 overflow-hidden rounded-full bg-[#151515] shadow-lg">
      <Particles state={currentState} />
      <input
        className="h-full w-full bg-transparent font-mono text-base text-white outline-none placeholder:font-mono placeholder:text-sm placeholder:text-[#A0A0A0] placeholder:md:text-base"
        {...inputProps}
      />
    </div>
  );
};
