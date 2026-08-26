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
    <section className="relative isolate h-[45vh] min-h-[280px] w-full overflow-hidden md:h-[60vh]">
      <img
        src={image}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="veil absolute inset-0" />
      <div className="relative flex h-full items-center justify-center px-6 text-center">
        <Reveal className="text-center">
          <p className="font-display text-[1.6rem] leading-[1.15] tracking-tight text-espresso-foreground sm:text-4xl md:text-5xl">
            {quote}
          </p>
          {caption ? (
            <>
              <span className="rule-gold mx-auto mt-6 block h-px w-16 opacity-60" />
              <p className="text-label mt-5 text-espresso-foreground/70">
                {caption}
              </p>
            </>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
