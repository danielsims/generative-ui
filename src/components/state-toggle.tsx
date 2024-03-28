import type { State } from "./chat-input";

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
            className={`px-3 py-1 rounded-full cursor-pointer text-sm ${
              activeState === state ? 'bg-white text-black' : 'text-[#888] hover:bg-[#333] hover:text-white'
            }`}
          >
            {state.charAt(0).toUpperCase() + state.slice(1)}
          </button>
        ))}
      </div>
    );
  };
  