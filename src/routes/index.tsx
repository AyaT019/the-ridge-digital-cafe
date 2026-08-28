import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import heroInterior from "@/assets/hero-interior.jpg";
import atmosphere1 from "@/assets/atmosphere-1.jpg";
import breakfastAsset from "@/assets/ridge-breakfast.webp";
import pistachioLatteAsset from "@/assets/ridge-pistachio-latte.png";
import mojitoFreshAsset from "@/assets/ridge-mojito-fresh.png";
import milkshakeAsset from "@/assets/ridge-milkshake-chocolate.png";
import sweetsAsset from "@/assets/ridge-sweet-chocolate.png";
import savoryAsset from "@/assets/ridge-savory-pizza-calzone.png";

import { menuSections } from "@/data/menu";
import { getMenu } from "@/lib/menu.functions";
import { SiteHeader } from "@/components/ridge/SiteHeader";
import { SiteFooter } from "@/components/ridge/SiteFooter";
import { MenuSectionBlock } from "@/components/ridge/MenuSectionBlock";
import { Atmosphere } from "@/components/ridge/Atmosphere";
import { Reveal } from "@/components/ridge/Reveal";
import { Ornament } from "@/components/ridge/Ornament";

export const Route = createFileRoute("/")({
  loader: async () => {
    try {
      return { sections: await getMenu() };
    } catch {
      return { sections: menuSections };
    }
  },
  head: () => ({
    meta: [
      { title: "The Ridge — Carte du café | Kélibia" },
      {
        name: "description",
        content:
          "La carte de The Ridge à Kélibia : cafés de spécialité, petits déjeuners, crêpes, pancakes, jus pressés et pizzas au four à bois. Prix en dinar tunisien.",
      },
      { property: "og:title", content: "The Ridge — Carte du café | Kélibia" },
      {
        property: "og:description",
        content:
          "Cafés de spécialité, petits déjeuners généreux, pâtisseries et jus pressés, servis dans un jardin d'intérieur à Kélibia.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  errorComponent: () => (
    <main className="flex min-h-screen items-center justify-center bg-background px-5">
      <p className="font-display text-2xl text-foreground">
        La carte est momentanément indisponible.
      </p>
    </main>
  ),
  component: Index,
});

const sectionImages: Record<
  string,
  {
    src: string;
    alt: string;
    w: number;
    h: number;
    secondary?: { src: string; alt: string; w: number; h: number };
  }
> = {
  "petit-dejeuner": {
    src: breakfastAsset,
    alt: "Table de petit déjeuner en marbre avec croissants, omelette et fruits frais",
    w: 1600,
    h: 1104,
  },
  cafes: {
    src: pistachioLatteAsset,
    alt: "Latte au pistache crémeux, saupoudré de brisures de pistache",
    w: 1408,
    h: 1760,
  },
  fraicheur: {
    src: mojitoFreshAsset,
    alt: "Mojito rafraîchissant à la menthe et citron vert, servi avec glace pilée",
    w: 1408,
    h: 1760,
    secondary: {
      src: milkshakeAsset,
      alt: "Milkshake chocolaté gourmand avec crème chantilly et éclats de noisette",
      w: 1408,
      h: 1760,
    },
  },
  sucre: {
    src: sweetsAsset,
    alt: "Moelleux au chocolat coulant avec glace vanille et banane",
    w: 1408,
    h: 1760,
  },
  sale: {
    src: savoryAsset,
    alt: "Pizza garnie au thon et calzone doré avec frites rustiques",
    w: 1408,
    h: 1760,
  },
};

function Index() {
  const { sections: allSections } = Route.useLoaderData();
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const sections = useMemo(() => {
    if (!q) return allSections;
    return allSections
      .map((section) => ({
        ...section,
        groups: section.groups
          .map((group) => ({
            ...group,
            items: group.items.filter(
              (item) =>
                item.name.toLowerCase().includes(q) ||
                (item.description ?? "").toLowerCase().includes(q) ||
                group.title.toLowerCase().includes(q),
            ),
          }))
          .filter((group) => group.items.length > 0),
      }))
      .filter((section) => section.groups.length > 0);
  }, [q, allSections]);

  const resultCount = sections.reduce(
    (n, s) => n + s.groups.reduce((m, g) => m + g.items.length, 0),
    0,
  );

  return (
    <div id="top" className="bg-background">
      <SiteHeader query={query} onQueryChange={setQuery} />

      <main>
        {/* Hero */}
        <section className="relative isolate flex h-[100svh] min-h-[520px] w-full items-end overflow-hidden">
          <img
            src={heroInterior}
            alt="Salle du café The Ridge, feuillage tropical et lampes en rotin dans une lumière dorée"
            width={1920}
            height={1280}
            fetchPriority="high"
            className="animate-slow-zoom absolute inset-0 h-full w-full object-cover"
          />
          <div className="veil absolute inset-0" />
          <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 sm:px-6 md:pb-28">
            <p className="text-label animate-rise text-espresso-foreground/70">
              Kélibia · depuis 2019
            </p>
            <h1 className="font-display animate-rise mt-5 text-[3.5rem] leading-[0.9] tracking-tight text-espresso-foreground sm:text-8xl md:text-[9rem]">
              The Ridge
            </h1>
            <div className="mt-8 flex flex-col gap-6 md:mt-10 md:flex-row md:items-end md:justify-between">
              <p className="animate-rise max-w-md text-sm leading-relaxed text-espresso-foreground/75 md:text-base">
                Un café-jardin où le grain est torréfié lentement, la pâte
                reposée une nuit entière et les fruits pressés à la commande.
              </p>
              <a
                href="#petit-dejeuner"
                className="text-label animate-rise inline-flex w-fit items-center gap-3 border-b border-accent pb-2 text-espresso-foreground transition-colors hover:text-accent"
              >
                Découvrir la carte
                <span aria-hidden>↓</span>
              </a>
            </div>
          </div>
        </section>

        {/* Manifesto */}
        <section className="mx-auto w-full max-w-3xl px-5 py-16 text-center sm:px-6 md:py-28">
          <Reveal>
            <Ornament />
            <p className="font-display mt-8 text-xl leading-[1.35] tracking-tight text-foreground sm:text-2xl md:text-4xl">
              Rien ici n'est pressé. Le café coule, la lumière tourne, et la
              journée prend la forme de votre table.
            </p>
            <p className="text-label mt-8 text-muted-foreground">La maison</p>
          </Reveal>
        </section>

        {q ? (
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
            <p className="text-label border-b border-border pb-4 text-muted-foreground">
              {resultCount} résultat{resultCount > 1 ? "s" : ""} pour « {query} »
            </p>
          </div>
        ) : null}

        {sections.length === 0 ? (
          <div className="mx-auto w-full max-w-6xl px-5 py-20 text-center sm:px-6">
            <p className="font-display text-3xl tracking-tight text-foreground">
              Rien à cette carte sous ce nom.
            </p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-label mt-6 border-b border-accent pb-1 text-muted-foreground transition-colors hover:text-accent-foreground"
            >
              Voir toute la carte
            </button>
          </div>
        ) : null}

        {sections.map((section, i) => {
          const img = sectionImages[section.id];
          return (
            <div key={section.id}>
              <MenuSectionBlock
                section={section}
                image={img?.src}
                imageAlt={img?.alt}
                imageWidth={img?.w}
                imageHeight={img?.h}
                secondaryImage={img?.secondary?.src}
                secondaryImageAlt={img?.secondary?.alt}
                secondaryImageWidth={img?.secondary?.w}
                secondaryImageHeight={img?.secondary?.h}
                reverse={i % 2 === 1}
              />
              {!q && i === 0 ? (
                <Atmosphere
                  image={atmosphere1}
                  alt="Fauteuil en velours près d'une fenêtre, tasse de café et plantes tropicales"
                  quote="Prenez votre temps."
                  caption="Salle intérieure · fin d'après-midi"
                  width={1920}
                  height={1088}
                />
              ) : null}
            </div>
          );
        })}
      </main>

      <SiteFooter />
    </div>
  );
}

