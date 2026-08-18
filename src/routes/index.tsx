import { createFileRoute } from "@tanstack/react-router";

import heroInterior from "@/assets/hero-interior.jpg";
import atmosphere1 from "@/assets/atmosphere-1.jpg";
import atmosphere2 from "@/assets/atmosphere-2.jpg";
import breakfast from "@/assets/breakfast.jpg";
import coffee from "@/assets/coffee.jpg";
import drinks from "@/assets/drinks.jpg";
import sweets from "@/assets/sweets.jpg";
import savory from "@/assets/savory.jpg";

import { menuSections } from "@/data/menu";
import { SiteHeader } from "@/components/ridge/SiteHeader";
import { SiteFooter } from "@/components/ridge/SiteFooter";
import { MenuSectionBlock } from "@/components/ridge/MenuSectionBlock";
import { Atmosphere } from "@/components/ridge/Atmosphere";
import { Reveal } from "@/components/ridge/Reveal";

export const Route = createFileRoute("/")({
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
  component: Index,
});

const sectionImages: Record<
  string,
  { src: string; alt: string; w: number; h: number }
> = {
  "petit-dejeuner": {
    src: breakfast,
    alt: "Table de petit déjeuner en marbre avec croissants, omelette et fruits frais",
    w: 1600,
    h: 1104,
  },
  cafes: {
    src: coffee,
    alt: "Espresso versé dans une tasse en céramique",
    w: 1408,
    h: 1760,
  },
  fraicheur: {
    src: drinks,
    alt: "Jus pressés et mojito à la menthe fraîche",
    w: 1408,
    h: 1760,
  },
  sucre: {
    src: sweets,
    alt: "Pancakes dorés nappés de chocolat et pistache",
    w: 1408,
    h: 1760,
  },
  sale: {
    src: savory,
    alt: "Pizza au four à bois et makloub à l'escalope",
    w: 1408,
    h: 1760,
  },
};

function Index() {
  return (
    <div id="top" className="bg-background">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative isolate flex h-[100svh] min-h-[600px] w-full items-end overflow-hidden">
          <img
            src={heroInterior}
            alt="Salle du café The Ridge, feuillage tropical et lampes en rotin dans une lumière dorée"
            width={1920}
            height={1280}
            fetchPriority="high"
            className="animate-slow-zoom absolute inset-0 h-full w-full object-cover"
          />
          <div className="veil absolute inset-0" />
          <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 md:pb-28">
            <p className="text-eyebrow animate-rise text-espresso-foreground/70">
              Kélibia · depuis 2019
            </p>
            <h1 className="font-display animate-rise mt-6 text-6xl leading-[0.88] tracking-tight text-espresso-foreground sm:text-8xl md:text-[9rem]">
              The Ridge
            </h1>
            <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <p className="animate-rise max-w-md text-sm leading-relaxed text-espresso-foreground/75 md:text-base">
                Un café-jardin où le grain est torréfié lentement, la pâte
                reposée une nuit entière et les fruits pressés à la commande.
              </p>
              <a
                href="#petit-dejeuner"
                className="text-eyebrow animate-rise inline-flex w-fit items-center gap-3 border-b border-accent pb-2 text-espresso-foreground transition-colors hover:text-accent"
              >
                Découvrir la carte
                <span aria-hidden>↓</span>
              </a>
            </div>
          </div>
        </section>

        {/* Manifesto */}
        <section className="mx-auto w-full max-w-4xl px-6 py-24 text-center md:py-32">
          <Reveal>
            <span className="rule-gold mx-auto block h-px w-20 opacity-70" />
            <p className="font-display mt-10 text-3xl leading-[1.25] tracking-tight text-foreground md:text-5xl">
              Rien ici n'est pressé. Le café coule, la lumière tourne, et la
              journée prend la forme de votre table.
            </p>
            <p className="text-eyebrow mt-10 text-muted-foreground">
              La maison
            </p>
          </Reveal>
        </section>

        {menuSections.map((section, i) => {
          const img = sectionImages[section.id];
          return (
            <div key={section.id}>
              <MenuSectionBlock
                section={section}
                image={img?.src}
                imageAlt={img?.alt}
                imageWidth={img?.w}
                imageHeight={img?.h}
                reverse={i % 2 === 1}
              />
              {i === 0 ? (
                <Atmosphere
                  image={atmosphere1}
                  alt="Fauteuil en velours près d'une fenêtre, tasse de café et plantes tropicales"
                  quote="Prenez votre temps."
                  caption="Salle intérieure · fin d'après-midi"
                  width={1920}
                  height={1088}
                />
              ) : null}
              {i === 2 ? (
                <Atmosphere
                  image={atmosphere2}
                  alt="Terrasse du café le soir, guirlandes lumineuses et lanternes en laiton face à la mer"
                  quote="Le soir tombe, la table reste."
                  caption="Terrasse · vue mer"
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
