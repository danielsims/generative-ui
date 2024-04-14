import type { ImageProps } from "next/image";

import type { GenerativeImageStates } from "../config/types";
import { cn } from "../../index";
import BlurImage from "./blur-image";
import Caption from "./caption";

interface GenerativeImageProps extends ImageProps {
  src: string;
  alt: string;
  model: string;
  controlledState?: GenerativeImageStates;
}

export function GenerativeImage({
  src,
  alt,
  model,
  controlledState,
  ...rest
}: GenerativeImageProps) {
  return (
    <div className="shadow-inner-dark group relative aspect-square h-auto w-full min-w-[50vw] overflow-hidden rounded-xl border border-[#252525] md:w-[400px] md:min-w-[400px]">
      <BlurImage
        src={src}
        alt={alt}
        className="h-auto w-full max-w-full rounded-xl"
        {...rest}
      />
      <div
        className={cn(
          "absolute inset-0 hidden items-center gap-4 p-4 transition-all",
          controlledState === "hover"
            ? "flex bg-black/20"
            : "group-hover:flex group-hover:bg-black/20",
        )}
      >
        <Caption model={model} alt={alt} />
      </div>
    </div>
  );
}
