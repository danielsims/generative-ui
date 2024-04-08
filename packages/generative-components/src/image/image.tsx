export function GenerativeImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-full">
      <img
        src={src}
        alt={alt}
        className="shadow-inner-dark h-auto max-w-full rounded-xl"
      />
    </div>
  );
}
