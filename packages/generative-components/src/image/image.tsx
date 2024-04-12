import BlurImage from "./blur-image";
import Caption from "./caption";

export function GenerativeImage({
  src,
  alt,
  model,
}: {
  src: string;
  alt: string;
  model: string;
}) {
  return (
    <div className="shadow-inner-dark group relative aspect-square h-auto w-full overflow-hidden rounded-xl border border-[#252525] md:w-[400px]">
      <BlurImage
        src={src}
        alt={alt}
        className="h-auto w-full max-w-full rounded-xl"
      />
      <div className="absolute inset-0 hidden items-center gap-4 p-4 transition-all group-hover:flex group-hover:bg-black/20">
        <Caption model={model} alt={alt} />
      </div>
    </div>
  );
}
