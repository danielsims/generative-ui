import type { CxOptions } from "class-variance-authority";
import { cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: CxOptions) => twMerge(cx(inputs));

export { cn };

export * from "./config";
export * from "./chat-input/chat-input";
export * from "./generative-image/index";
export * from "./generative-input/index";
