import type { State } from "./chat-input";
import { motion } from "framer-motion";

interface StateToggleProps {
    states: readonly State[];
    activeState: string;
    onStateChange: (newState: State) => void;
}

export const StateToggle = ({ states, activeState, onStateChange }: StateToggleProps) => {
    return (
        <div className="flex gap-2 items-center">
            {states.map((state) => (
                <button
                    key={state}
                    onClick={() => onStateChange(state)}
                    className={`${state === activeState ? "" : "text-white/50 hover:text-white"
                        } relative rounded-full px-3 py-1 text-sm text-white transition`}
                    style={{
                        WebkitTapHighlightColor: 'transparent',
                    }}
                >
                    {activeState === state && (
                        <motion.span
                            layoutId="active-state"
                            className="absolute inset-0 z-10 bg-white mix-blend mix-blend-difference"
                            style={{ borderRadius: 9999 }}
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    {state.charAt(0).toUpperCase() + state.slice(1)}
                </button>
            ))}
        </div>
    );
};
