"use client";

import React, { useCallback, useState } from "react";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { motion, AnimatePresence } from "framer-motion"
import type { GenerativeInputStates } from "../../generative-input";

interface GenerativeInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  placeholder: string;
  controlledState?: GenerativeInputStates;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStateChange?: (state: GenerativeInputStates) => void;
}


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
    <>
      {["idle", "focus", "typing"].includes(internalState) &&
        <AnimatePresence>
          <motion.div
            layoutId="motion-element"
            className="flex items-center gap-4 rounded-full py-2.5 px-3.5 shadow-border w-full max-w-[420px]"
            data-state={currentState}
          >
            <Search className="h-5  w-5 text-foreground" strokeWidth={2} />
            <input
              className="flex-1 bg-transparent text-foreground outline-none placeholder:text-zinc-500 sm:text-sm "
              {...inputProps}
            />
          </motion.div>
        </AnimatePresence>
      }
      {internalState === "loading" &&
        <div className="flex flex-col gap-4 items-center mx-auto">
          <AnimatePresence>
            <motion.div className="w-[400px] shadow-border px-4 py-8 rounded-xl flex flex-col gap-2">
              <motion.span className="text-sm text-emerald-400">generating image</motion.span>
              <motion.span className="text-lg">Abstract GLSL Shader</motion.span>
            </motion.div>
          </AnimatePresence>
          <AnimatePresence>
            <motion.button
              layoutId="motion-element"
              className="flex items-center gap-2 rounded-full py-2 px-3 shadow-border w-fit overflow-hidden cursor-pointer"
              data-state={currentState}
              onClick={() => setInternalState("idle")}
            >
              <Search className="h-3.5 w-3.5 text-foreground" strokeWidth={2} />
            </motion.button>
          </AnimatePresence>
        </div>
      }
    </>
  );
};
