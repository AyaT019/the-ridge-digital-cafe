import { useEffect, useState } from "react";
import { menuSections } from "@/data/menu";

const navLabels: Record<string, string> = {
  "petit-dejeuner": "Petit Déjeuner",
  cafes: "Cafés",
  fraicheur: "Fraîcheur",
  sucre: "Sucré",
  sale: "Salé",
};

export function SiteHeader({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (value: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = menuSections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (targets.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    for (const t of targets) observer.observe(t);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "border-b border-border bg-background/92 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 transition-all sm:px-6 duration-700 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <a
          href="#top"
          className={`font-display min-w-0 truncate text-xl leading-none sm:text-2xl tracking-tight transition-colors ${
            scrolled ? "text-foreground" : "text-espresso-foreground"
          }`}
        >
          The&nbsp;Ridge
        </a>

        <div className="flex shrink-0 items-center gap-4 sm:gap-5">
          <label
            className={`group hidden items-center gap-2 border-b pb-1 transition-colors sm:flex ${
              scrolled
                ? "border-border focus-within:border-accent"
                : "border-espresso-foreground/40 focus-within:border-accent"
            }`}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className={scrolled ? "text-muted-foreground" : "text-espresso-foreground/70"}
              aria-hidden
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.6-3.6" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Rechercher"
              aria-label="Rechercher un plat ou une boisson"
              className={`w-28 bg-transparent text-[0.7rem] uppercase tracking-[0.22em] outline-none transition-all focus:w-40 ${
                scrolled
                  ? "text-foreground placeholder:text-muted-foreground/70"
                  : "text-espresso-foreground placeholder:text-espresso-foreground/60"
              }`}
            />
          </label>

          <a
            href="#petit-dejeuner"
            className={`text-label transition-colors ${
              scrolled
                ? "text-foreground hover:text-accent-foreground"
                : "text-espresso-foreground hover:text-accent"
            }`}
          >
            La carte
          </a>
        </div>
      </div>

      {/* Category rail */}
      <div
        className={`overflow-hidden transition-all duration-700 ${
          scrolled ? "max-h-16 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto w-full max-w-6xl border-t border-border/70 px-5 sm:px-6">
          <ul className="scrollbar-none flex items-center gap-6 overflow-x-auto py-3 sm:gap-7">
            {menuSections.map((s) => (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  className={`text-label whitespace-nowrap border-b pb-1 transition-colors ${
                    active === s.id
                      ? "border-accent text-accent-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {navLabels[s.id] ?? s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile search */}
      <div
        className={`px-5 pb-3 sm:hidden ${scrolled ? "block" : "hidden"}`}
      >
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Rechercher un plat…"
          aria-label="Rechercher un plat ou une boisson"
          className="w-full border-b border-border bg-transparent pb-2 text-xs tracking-[0.18em] text-foreground uppercase outline-none placeholder:text-muted-foreground/70 focus:border-accent"
        />
      </div>
    </header>
  );
}
