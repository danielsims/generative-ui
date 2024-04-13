"use client";

import type { ImageProps } from "next/image";
import { useState } from "react";
import Image from "next/image";

import { cn } from "../index";

function BlurImage({
  src,
  alt,
  className,
  ...rest
}: {
  src: string;
  alt: string;
  className: string;
} & ImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      src={src}
      alt={alt}
      layout="fill"
      objectFit="cover"
      className={cn(
        className,
        "duration-700 ease-in-out",
        isLoading
          ? "scale-110 blur-2xl grayscale"
          : "scale-100 blur-0 grayscale-0",
      )}
      onLoadingComplete={() => setLoading(false)}
      {...rest}
    />
  );
}

export default BlurImage;
