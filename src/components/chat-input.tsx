"use client"

import { useState } from 'react'
import { Particles } from './particles'

export const ChatInput = () => {

    const [placeholder, setPlaceholder] = useState('What do you need?')

    const onFocus = () => {
        // Wipe placeholder content to left on focus, animate to flashing text caret
        setPlaceholder('')
    }

    const onBlur = () => {
        // Animate placeholder content back to center on blur
        setPlaceholder('What do you need?')
    }

    return (
        <div className="flex gap-2 items-center justify-center">
            <Particles />
            <input
                placeholder={placeholder}
                className="bg-transparent placeholder:text-zinc-300 text-white outline-none w-full h-full text-base"
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </div>
    )
}