"use client";

import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

import type { GenerativeInputStates } from "../../generative-input";

interface GenerativeInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  placeholder: string;
  controlledState?: GenerativeInputStates;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStateChange?: (state: GenerativeInputStates) => void;
}

export const GenerativeInput = forwardRef<
  HTMLInputElement,
  GenerativeInputProps
>(
  (
    { value, placeholder, controlledState, onChange, onStateChange, ...rest },
    ref,
  ) => {
    const [internalState, setInternalState] =
      useState<GenerativeInputStates>("idle");
    const [internalPlaceholder, setInternalPlaceholder] = useState(placeholder);
    const [currentState] = useState<GenerativeInputStates>(
      controlledState ?? internalState,
    );

    const changeState = useCallback(
      (newState: GenerativeInputStates) => {
        setInternalState(newState);
        onStateChange?.(newState);
      },
      [onStateChange],
    );

    useEffect(() => {
      if (controlledState) {
        changeState(controlledState);
      }
    }, [controlledState, changeState]);

    const debouncedTypingToIdle = useDebouncedCallback(() => {
      if (internalState === "loading") return;
      changeState("focus");
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
        {["idle", "focus", "typing"].includes(internalState) && (
          <AnimatePresence>
            <motion.div
              layoutId="motion-element"
              className="flex w-full max-w-[420px] items-center gap-4 rounded-full bg-background px-3.5 py-2.5 shadow-border"
              data-state={currentState}
            >
              <motion.div layoutId="motion-icon">
                <Search className="h-5  w-5 text-foreground" strokeWidth={2} />
              </motion.div>
              <input
                className="flex-1 bg-transparent text-foreground outline-none placeholder:text-zinc-500 sm:text-sm"
                {...inputProps}
                ref={ref}
              />
            </motion.div>
          </AnimatePresence>
        )}
        {internalState === "loading" && (
          <div className="relative mx-auto flex flex-col items-center gap-4">
            <AnimatePresence>
              <motion.div
                className="mt-[100px] flex w-[400px] flex-col gap-2 rounded-xl bg-background px-4 py-8 opacity-0 shadow-border"
                animate={{
                  y: internalState === "loading" ? -100 : 0,
                  opacity: internalState === "loading" ? 1 : 0,
                }}
              >
                <motion.span className="text-sm text-emerald-400">
                  generating image
                </motion.span>
                <motion.span className="text-lg text-foreground">
                  Abstract GLSL Shader
                </motion.span>
              </motion.div>
            </AnimatePresence>
            <AnimatePresence>
              <motion.button
                layoutId="motion-element"
                className="absolute top-32 flex w-[120px] cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-background px-3 py-2 shadow-border"
                data-state={currentState}
                onClick={() => setInternalState("idle")}
              >
                <motion.div layoutId="motion-icon">
                  <Search
                    className="h-3.5 w-3.5 text-foreground"
                    strokeWidth={2}
                  />
                </motion.div>
              </motion.button>
            </AnimatePresence>
          </div>
        )}
      </>
    );
  },
);

GenerativeInput.displayName = "GenerativeInput";
