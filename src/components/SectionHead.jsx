export default function SectionHead({ index, kicker, title, children, align = "left" }) {
  const center = align === "center";
  return (
    <div className={`reveal mb-12 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <div className={`mb-5 flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-mute uppercase ${center ? "justify-center" : ""}`}>
        <span className="text-neon">{index}</span>
        <span className="h-px w-10 bg-neon/60" />
        {kicker}
      </div>
      <h2 className="text-5xl leading-[0.95] font-bold tracking-[-0.04em] sm:text-6xl">{title}</h2>
      {children && <p className="mt-5 text-lg text-chalk/60">{children}</p>}
    </div>
  );
}
