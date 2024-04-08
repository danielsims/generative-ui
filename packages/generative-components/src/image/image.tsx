export function GenerativeImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="shadow-inner-dark group relative aspect-square h-auto w-full rounded-xl border border-[#252525]">
      <img src={src} alt={alt} className="h-auto max-w-full rounded-xl" />
      <div className="absolute inset-0 hidden items-center gap-4 p-8 transition-all group-hover:flex group-hover:bg-black/20">
        <div className="absolute bottom-12 left-0 flex max-h-[300px] w-full flex-col gap-6 px-12">
          <div className="font-mono">Dall-E 3</div>
          <div
            className="w-full overflow-hidden text-ellipsis text-4xl capitalize"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: "3",
              WebkitBoxOrient: "vertical",
            }}
          >
            {alt}
          </div>
        </div>
      </div>
    </div>
  );
}
