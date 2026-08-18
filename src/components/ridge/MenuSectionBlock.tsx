import type { MenuSection } from "@/data/menu";
import { Reveal } from "./Reveal";

export function MenuSectionBlock({
  section,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  reverse = false,
}: {
  section: MenuSection;
  image?: string | undefined;
  imageAlt?: string | undefined;
  imageWidth?: number | undefined;
  imageHeight?: number | undefined;
  reverse?: boolean | undefined;
}) {
  return (
    <section
      id={section.id}
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-20 md:py-28"
    >
      <Reveal>
        <header className="max-w-2xl">
          <p className="text-eyebrow text-muted-foreground">{section.eyebrow}</p>
          <h2 className="font-display mt-4 text-5xl leading-[0.95] tracking-tight text-foreground md:text-7xl">
            {section.title}
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {section.intro}
          </p>
        </header>
      </Reveal>

      <div
        className={`mt-14 grid gap-14 ${image ? "lg:grid-cols-[1.15fr_0.85fr]" : ""} ${
          reverse ? "lg:[&>figure]:order-first" : ""
        }`}
      >
        <div className="grid gap-x-14 gap-y-12 sm:grid-cols-2">
          {section.groups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 70}>
              <div>
                <div className="flex items-baseline gap-4">
                  <h3 className="text-eyebrow text-accent-foreground/80">
                    {group.title}
                  </h3>
                  <span className="rule-gold h-px flex-1 opacity-60" />
                </div>
                <ul className="mt-6 space-y-5">
                  {group.items.map((item) => (
                    <li key={item.name} className="group">
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-xl tracking-tight text-foreground transition-colors group-hover:text-accent-foreground">
                          {item.name}
                        </span>
                        <span className="mb-1 flex-1 border-b border-dotted border-border" />
                        <span className="font-sans text-sm tabular-nums text-muted-foreground">
                          {item.price}
                          <span className="ml-1 text-[0.65rem] uppercase tracking-widest opacity-70">
                            dt
                          </span>
                        </span>
                      </div>
                      {item.description ? (
                        <p className="mt-1.5 max-w-md text-[0.8rem] leading-relaxed text-muted-foreground/80">
                          {item.description}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {image ? (
          <figure className="hidden lg:block">
            <Reveal delay={120}>
              <div className="sticky top-24 overflow-hidden">
                <img
                  src={image}
                  alt={imageAlt ?? section.title}
                  width={imageWidth}
                  height={imageHeight}
                  loading="lazy"
                  className="h-[34rem] w-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.04]"
                />
                <figcaption className="text-eyebrow mt-4 text-muted-foreground">
                  {section.title}
                </figcaption>
              </div>
            </Reveal>
          </figure>
        ) : null}
      </div>
    </section>
  );
}
