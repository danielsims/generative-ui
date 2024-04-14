export const generativeImageStates = ["loading", "default", "hover"] as const;
export type GenerativeImageStates = (typeof generativeImageStates)[number];
