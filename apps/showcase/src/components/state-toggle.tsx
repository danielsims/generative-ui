import { motion } from "framer-motion";

interface StateToggleProps<T> {
  states: readonly T[];
  activeState: T;
  onStateChange: (newState: T) => void;
}

export function StateToggle<T>({
  states,
  activeState,
  onStateChange,
}: StateToggleProps<T>) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {states.map((state) => (
        <button
          key={String(state)}
          onClick={() => onStateChange(state)}
          className={`${
            state === activeState ? "" : "text-white/50 hover:text-white"
          } relative rounded-full px-3 py-1 text-sm text-white transition`}
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          {activeState === state && (
            <motion.span
              layoutId="active-state"
              className="absolute inset-0 z-10 bg-white mix-blend-difference"
              style={{ borderRadius: 9999, mixBlendMode: "difference" }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {String(state).charAt(0).toUpperCase() + String(state).slice(1)}
        </button>
      ))}
    </div>
  );
}
