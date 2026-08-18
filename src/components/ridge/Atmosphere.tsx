import { Reveal } from "./Reveal";

export function Atmosphere({
  image,
  alt,
  quote,
  caption,
  width,
  height,
}: {
  image: string;
  alt: string;
  quote: string;
  caption?: string;
  width: number;
  height: number;
}) {
  return (
    <section className="relative isolate h-[70vh] min-h-[420px] w-full overflow-hidden md:h-[85vh]">
      <img
        src={image}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="veil absolute inset-0" />
      <div className="relative flex h-full items-center justify-center px-6">
        <Reveal className="text-center">
          <p className="font-display text-4xl leading-[1.05] tracking-tight text-espresso-foreground sm:text-6xl md:text-7xl">
            {quote}
          </p>
          {caption ? (
            <>
              <span className="rule-gold mx-auto mt-8 block h-px w-24 opacity-70" />
              <p className="text-eyebrow mt-6 text-espresso-foreground/70">
                {caption}
              </p>
            </>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
