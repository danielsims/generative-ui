const Caption = ({ model, alt }: { model: string; alt: string }) => {
    return (
        <div className="absolute bottom-6 left-0 flex max-h-[300px] w-full flex-col gap-4 px-6">
            <div className="font-mono text-sm">{model}</div>
            <div
                className="w-full overflow-hidden text-ellipsis text-lg capitalize"
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
