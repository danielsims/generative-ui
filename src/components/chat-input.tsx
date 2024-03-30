import React, { useState, useEffect, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Particles } from './particles';

// Define props interface for better type checking
interface ChatInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    controlledState?: State;
    onStateChange?: (state: State) => void;
}

export const states = ['idle', 'focus', 'typing', 'loading', 'error'] as const;
export type State = typeof states[number];

export const ChatInput = ({ controlledState, onStateChange, ...rest }: ChatInputProps) => {
    const [internalState, setInternalState] = useState<State>('idle');
    const currentState = controlledState || internalState;

    const changeState = useCallback((newState: State) => {
        if (controlledState === undefined) {
            setInternalState(newState);
        }
        onStateChange?.(newState);
    }, [controlledState, onStateChange]);

    const debouncedTypingToFocus = useDebouncedCallback(() => {
        changeState('focus');
    }, 900);

    const handleFocus = useCallback(() => changeState('focus'), [changeState]);
    const handleBlur = useCallback(() => changeState('idle'), [changeState]);
    const handleInput = useCallback(() => {
        changeState('typing');
        debouncedTypingToFocus();
    }, [changeState, debouncedTypingToFocus]);

    const inputProps = {
        onFocus: handleFocus,
        onBlur: handleBlur,
        onInput: handleInput,
        ...rest
    };

    return (
        <div className="flex h-[56px] gap-2 items-center justify-center bg-[#151515] rounded-full w-full max-w-2xl shadow-lg shadow-inner-shadow-dark-sm overflow-hidden">
            <Particles state={currentState} />
            <input
                className="bg-transparent placeholder:text-[#A0A0A0] placeholder:text-sm placeholder:font-mono font-mono placeholder:md:text-base text-white outline-none w-full h-full text-base"
                {...inputProps}
            />
        </div>
    );
};
