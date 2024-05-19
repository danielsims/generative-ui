export const generativeInputStates = [
  "idle",
  "focus",
  "typing",
  "loading",
] as const;
export type GenerativeInputStates = (typeof generativeInputStates)[number];
