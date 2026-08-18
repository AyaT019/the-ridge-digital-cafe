import { useEffect, useState } from "react";
import { menuSections } from "@/data/menu";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-background/90 py-3 shadow-[0_1px_0_0_var(--color-border)] backdrop-blur-md"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6">
        <a
          href="#top"
          className={`font-display text-2xl leading-none tracking-tight transition-colors ${
            scrolled ? "text-foreground" : "text-espresso-foreground"
          }`}
        >
          The Ridge
        </a>
        <ul
          className={`hidden items-center gap-8 text-[0.65rem] uppercase tracking-[0.3em] transition-colors lg:flex ${
            scrolled ? "text-muted-foreground" : "text-espresso-foreground/75"
          }`}
        >
          {menuSections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="transition-colors hover:text-accent"
              >
                {s.title.split(" ")[0]?.replace(/[,&]$/, "")}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#petit-dejeuner"
          className={`text-[0.65rem] uppercase tracking-[0.3em] transition-colors ${
            scrolled
              ? "text-foreground hover:text-accent-foreground"
              : "text-espresso-foreground hover:text-accent"
          }`}
        >
          La carte
        </a>
      </nav>
    </header>
  );
}
