"use client";

import React, { useCallback, useState } from "react";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

interface GenerativeInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  placeholder: string;
  controlledState?: GenerativeInputStates;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStateChange?: (state: string) => void;
}

const generativeInputStates = ["idle", "focus", "typing"] as const;
type GenerativeInputStates = (typeof generativeInputStates)[number];

export const GenerativeInput = ({
  value,
  placeholder,
  controlledState,
  onChange,
  onStateChange,
  ...rest
}: GenerativeInputProps) => {
  const [internalState, setInternalState] =
    useState<GenerativeInputStates>("idle");
  const [internalPlaceholder, setInternalPlaceholder] = useState(placeholder);
  const currentState = controlledState ?? internalState;

  const changeState = useCallback(
    (newState: GenerativeInputStates) => {
      setInternalState(newState);
      onStateChange?.(newState);
    },
    [onStateChange],
  );

  const debouncedTypingToIdle = useDebouncedCallback(() => {
    changeState("idle");
  }, 900);

  const handleInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event);
      changeState("typing");
      debouncedTypingToIdle();
    },
    [onChange, changeState, debouncedTypingToIdle],
  );

  const handleFocus = () => {
    setInternalPlaceholder("");
    changeState("focus");
  };

  const handleBlur = () => {
    setInternalPlaceholder(placeholder);
    changeState("idle");
  };

  const inputProps = {
    value,
    placeholder: internalPlaceholder,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onInput: handleInput,
    onChange,
    ...rest,
  };

  return (
    <div
      className="flex items-center gap-2 rounded-full p-2 shadow-border"
      data-state={currentState}
    >
      <Search className="h-6  w-6 text-zinc-400" />
      <input
        className="flex-1 bg-transparent text-foreground outline-none placeholder:text-zinc-400"
        {...inputProps}
      />
    </div>
  );
};
