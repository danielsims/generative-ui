"use client"

import { useEffect, useState, useCallback } from 'react'
import { Particles } from './particles'

interface ChatInputProps {
    value?: string;
    controlledState?: State;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onStateChange?: (state: State) => void;
}

export const states = ['idle', 'focus', 'typing', 'loading', 'error'] as const;
export type State = typeof states[number];

export const ChatInput = ({ value, onChange, controlledState, onStateChange }: ChatInputProps) => {

    const [placeholder, setPlaceholder] = useState('What do you need?')
    const [internalState, setInternalState] = useState<State>('idle');

    // Handle state changes, accounting for controlled and internal states
    const changeState = useCallback((newState: State) => {
        if (!controlledState) {
            // If there's no controlled state, use internal state
            setInternalState(newState);
        }
        // Notify parent of state change, regardless of internal or controlled state
        onStateChange?.(newState);
    }, [controlledState, setInternalState, onStateChange]);

    // Determine the current state to use: controlled state (if provided) or internal state
    const currentState = controlledState ?? internalState;

    useEffect(() => {
        if (controlledState && controlledState !== internalState) {
            const newState = controlledState;
            changeState(newState)
        }
    }, [controlledState, changeState, internalState])

    const onFocus = () => {
        setPlaceholder('')
        changeState('focus');
    };

    const onBlur = () => {
        setPlaceholder('What do you need?')
        changeState('idle');
    };


    return (
        <div className="flex h-[56px] gap-2 items-center justify-center bg-[#151515] rounded-full w-full max-w-2xl shadow-lg shadow-inner-shadow-dark-sm overflow-hidden">
            <Particles state={currentState} />
            <input
                value={value}
                placeholder={placeholder}
                className="bg-transparent placeholder:text-[#A0A0A0] placeholder:text-sm placeholder:font-mono font-mono placeholder:md:text-base text-white outline-none w-full h-full text-base"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </div>
    )
}