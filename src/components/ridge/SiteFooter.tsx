const hours = [
  { days: "Lundi — Jeudi", time: "07:30 — 23:00" },
  { days: "Vendredi — Samedi", time: "07:30 — 01:00" },
  { days: "Dimanche", time: "08:00 — 23:00" },
];

export function SiteFooter() {
  return (
    <footer className="bg-espresso text-espresso-foreground">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
        <div className="grid gap-14 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-display text-4xl leading-none tracking-tight">
              The Ridge
            </p>
            <p className="text-eyebrow mt-4 text-espresso-foreground/60">
              Kélibia · Tunisie
            </p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-espresso-foreground/70">
              Café, atelier de pâtisserie et jardin d'intérieur. Ouvert du
              premier espresso au dernier verre.
            </p>
          </div>

          <div>
            <h2 className="text-eyebrow text-espresso-foreground/50">Horaires</h2>
            <ul className="mt-6 space-y-3 text-sm text-espresso-foreground/80">
              {hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-6">
                  <span>{h.days}</span>
                  <span className="tabular-nums text-espresso-foreground/60">
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-eyebrow text-espresso-foreground/50">Nous trouver</h2>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a
                  href="https://maps.google.com/?q=The+Ridge+Kelibia"
                  target="_blank"
                  rel="noreferrer"
                  className="text-espresso-foreground/80 underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  Avenue Ali Belhouane, Kélibia
                </a>
              </li>
              <li>
                <a
                  href="tel:+21672000000"
                  className="text-espresso-foreground/80 underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  +216 72 000 000
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/the.ridge.kelibia"
                  target="_blank"
                  rel="noreferrer"
                  className="text-espresso-foreground/80 underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  @the.ridge.kelibia
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=The+Ridge+Kelibia"
                  target="_blank"
                  rel="noreferrer"
                  className="text-espresso-foreground/80 underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  Itinéraire Google Maps
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-espresso-foreground/15 pt-8 text-[0.7rem] uppercase tracking-[0.28em] text-espresso-foreground/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} The Ridge</span>
          <span>Prix en dinar tunisien · Service inclus</span>
        </div>
      </div>
    </footer>
  );
}
