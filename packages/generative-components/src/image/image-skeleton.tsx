import Caption from "./caption";

export function GenerativeImageSkeleton({
  model,
  prompt,
}: {
  model: string;
  prompt: string;
}) {
  return (
    <div className="shadow-inner-dark relative flex aspect-square h-auto w-full items-center justify-center rounded-xl border border-[#252525]">
      <div className="absolute inset-0 flex items-center gap-4 bg-black/20 p-8 transition-all">
        <Caption model={model} alt={prompt} />
      </div>
    </div>
  );
}
