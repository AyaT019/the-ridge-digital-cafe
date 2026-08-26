import type { MenuSection } from "@/data/menu";
import { Reveal } from "./Reveal";
import { LeafMark } from "./Ornament";

export function MenuSectionBlock({
  section,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  secondaryImage,
  secondaryImageAlt,
  secondaryImageWidth,
  secondaryImageHeight,
  reverse = false,
}: {
  section: MenuSection;
  image?: string | undefined;
  imageAlt?: string | undefined;
  imageWidth?: number | undefined;
  imageHeight?: number | undefined;
  secondaryImage?: string | undefined;
  secondaryImageAlt?: string | undefined;
  secondaryImageWidth?: number | undefined;
  secondaryImageHeight?: number | undefined;
  reverse?: boolean | undefined;
}) {
  return (
    <section
      id={section.id}
      className="mx-auto w-full max-w-6xl scroll-mt-28 px-5 py-14 sm:px-6 md:py-24"
    >
      <Reveal>
        <header className="grid gap-5 border-t border-border pt-7 md:grid-cols-[auto_minmax(0,1fr)] md:gap-12 md:pt-8">
          <div className="flex items-center gap-3">
            <LeafMark className="h-5 w-5 shrink-0 text-accent" />
            <p className="text-label text-muted-foreground">{section.eyebrow}</p>
          </div>
          <div className="min-w-0">
            <h2 className="font-display text-[2.25rem] leading-[1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {section.title}
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
              {section.intro}
            </p>
          </div>
        </header>
      </Reveal>

      <div
        className={`mt-10 grid gap-10 md:mt-16 md:gap-12 ${
          image ? "lg:grid-cols-[1.2fr_0.8fr] lg:gap-16" : ""
        } ${reverse ? "lg:[&>figure]:order-first" : ""}`}
      >
        <div className="grid gap-x-14 gap-y-10 sm:grid-cols-2 sm:gap-y-12">
          {section.groups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 60}>
              <div className="min-w-0">
                <div className="flex items-baseline gap-3">
                  <h3 className="text-label text-accent-foreground">
                    {group.title}
                  </h3>
                  <span className="hairline flex-1 opacity-70" />
                </div>
                <ul className="mt-5 space-y-4">
                  {group.items.map((item) => (
                    <li key={item.name} className="group">
                      <div className="flex items-baseline gap-2">
                        <span className="font-display min-w-0 text-[1.05rem] leading-snug tracking-tight text-foreground transition-colors group-hover:text-accent-foreground sm:text-lg">
                          {item.name}
                        </span>
                        <span className="leader" />
                        <span className="price-tabular shrink-0 text-sm text-foreground/80">
                          {item.price}
                          <span className="ml-1 text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                            dt
                          </span>
                        </span>
                      </div>
                      {item.description ? (
                        <p className="mt-1 max-w-md text-[0.78rem] leading-relaxed text-muted-foreground/85">
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
          <figure className="min-w-0">
            <Reveal delay={120}>
              <div className="space-y-8 lg:sticky lg:top-32 lg:space-y-10">
                <div className="overflow-hidden">
                  <img
                    src={image}
                    alt={imageAlt ?? section.title}
                    width={imageWidth}
                    height={imageHeight}
                    loading="lazy"
                    className="h-72 w-full object-cover transition-transform duration-[1600ms] ease-out hover:scale-[1.04] sm:h-96 lg:h-[32rem]"
                  />
                </div>
                <figcaption className="text-label mt-4 flex items-center gap-3 text-muted-foreground">
                  <span className="rule-gold h-px w-8 opacity-70" />
                  {section.title}
                </figcaption>

                {secondaryImage ? (
                  <div className="overflow-hidden">
                    <img
                      src={secondaryImage}
                      alt={secondaryImageAlt ?? section.title}
                      width={secondaryImageWidth}
                      height={secondaryImageHeight}
                      loading="lazy"
                      className="h-72 w-full object-cover transition-transform duration-[1600ms] ease-out hover:scale-[1.04] sm:h-96 lg:h-[32rem]"
                    />
                  </div>
                ) : null}
              </div>
            </Reveal>
          </figure>
        ) : null}
      </div>
    </section>
  );
}
