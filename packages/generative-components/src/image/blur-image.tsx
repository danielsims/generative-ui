"use client";

import { useState } from "react";
import Image from "next/image";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function BlurImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
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
    />
  );
}

export default BlurImage;
