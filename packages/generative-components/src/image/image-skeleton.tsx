export function GenerativeImageSkeleton({ prompt }: { prompt: string }) {
  return (
    <div className="aspect-square h-auto w-full border border-[#252525]">
      <p>{prompt}</p>
    </div>
  );
}
