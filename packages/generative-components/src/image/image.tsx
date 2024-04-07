export function GenerativeImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-full">
      <img src={src} alt={alt} className="h-auto max-w-full rounded-xl" />
    </div>
  );
}
