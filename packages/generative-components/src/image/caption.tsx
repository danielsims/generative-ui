const Caption = ({ model, alt }: { model: string; alt: string }) => {
  return (
    <div className="absolute bottom-12 left-0 flex max-h-[300px] w-full flex-col gap-6 px-12">
      <div className="font-mono">{model}</div>
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
  );
};

export default Caption;
