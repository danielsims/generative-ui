export function GenerativeImageSkeleton({ prompt }: { prompt: string }) {
  return (
    <div className="shadow-inner-dark flex aspect-square h-auto w-full items-center justify-center rounded-xl border border-[#252525]">
      <p className="w-full text-center">{prompt}</p>
    </div>
  );
}
