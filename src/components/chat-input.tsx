"use client"

import { useEffect, useState } from 'react'
import { Particles } from './particles'

interface ChatInputProps {
    state: State;
}

export const states = ['idle', 'focus', 'typing', 'loading', 'error'] as const;
export type State = typeof states[number];

export const ChatInput = ({ state }: ChatInputProps) => {

    const [placeholder, setPlaceholder] = useState('What do you need?')
    const [currentState, setCurrentState] = useState<State>('idle')

    useEffect(() => {
        setCurrentState(state)
    }, [state])

    const onFocus = () => {
        // Wipe placeholder content to left on focus, animate to flashing text caret
        setPlaceholder('')
        setCurrentState('focus')
    }

    const onBlur = () => {
        // Animate placeholder content back to center on blur
        setPlaceholder('What do you need?')
        setCurrentState('idle')
    }

    return (
        <div className="flex h-[56px] gap-2 items-center justify-center bg-[#151515] rounded-full w-full max-w-2xl shadow-lg shadow-inner-shadow-dark-sm overflow-hidden">
            <Particles state={currentState} />
            <input
                placeholder={placeholder}
                className="bg-transparent placeholder:text-[#A0A0A0] placeholder:text-sm placeholder:font-mono font-mono placeholder:md:text-base text-white outline-none w-full h-full text-base"
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </div>
    )
}