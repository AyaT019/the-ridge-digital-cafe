import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";

import {
  createMenuItem,
  deleteMenuItem,
  getAdminState,
  lockAdmin,
  unlockAdmin,
  updateMenuItem,
} from "@/lib/admin.functions";
import { sectionMeta, type MenuItemRow } from "@/lib/menu-shape";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Administration — The Ridge" },
      {
        name: "description",
        content:
          "Espace privé de gestion de la carte du café The Ridge à Kélibia.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Administration — The Ridge" },
      {
        property: "og:description",
        content: "Espace privé de gestion de la carte du café The Ridge.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

type Draft = {
  section_id: string;
  group_title: string;
  name: string;
  description: string;
  price: string;
};

const emptyDraft: Draft = {
  section_id: sectionMeta[0]?.id ?? "",
  group_title: "",
  name: "",
  description: "",
  price: "",
};

const inputClass =
  "w-full border-b border-border bg-transparent pb-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent";

function AdminPage() {
  const fetchState = useServerFn(getAdminState);
  const unlock = useServerFn(unlockAdmin);
  const lock = useServerFn(lockAdmin);
  const create = useServerFn(createMenuItem);
  const update = useServerFn(updateMenuItem);
  const remove = useServerFn(deleteMenuItem);

  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [items, setItems] = useState<MenuItemRow[]>([]);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [editing, setEditing] = useState<Draft & { id: string } | null>(null);

  const refresh = async () => {
    const state = await fetchState();
    setUnlocked(state.unlocked);
    setItems(state.items as MenuItemRow[]);
    setLoading(false);
  };

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const grouped = useMemo(() => {
    return sectionMeta
      .map((section) => ({
        ...section,
        rows: items.filter((i) => i.section_id === section.id),
      }))
      .filter((s) => s.rows.length > 0);
  }, [items]);

  async function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await unlock({ data: { password } });
      if (!res.ok) setError("Mot de passe incorrect.");
      else {
        setPassword("");
        await refresh();
      }
    } finally {
      setBusy(false);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await create({ data: draft });
      setDraft({ ...emptyDraft, section_id: draft.section_id, group_title: draft.group_title });
      await refresh();
    } catch {
      setError("Impossible d'ajouter cet article.");
    } finally {
      setBusy(false);
    }
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setBusy(true);
    setError("");
    try {
      await update({ data: editing });
      setEditing(null);
      await refresh();
    } catch {
      setError("Impossible d'enregistrer les modifications.");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id: string) {
    setBusy(true);
    try {
      await remove({ data: { id } });
      await refresh();
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-label text-muted-foreground">Chargement…</p>
      </main>
    );
  }

  if (!unlocked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-5">
        <form onSubmit={handleUnlock} className="w-full max-w-sm">
          <h1 className="font-display text-4xl tracking-tight text-foreground">
            Administration
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Entrez le mot de passe pour modifier la carte.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder="Mot de passe"
            className={`${inputClass} mt-8`}
          />
          {error ? (
            <p className="mt-3 text-xs text-destructive">{error}</p>
          ) : null}
          <button
            type="submit"
            disabled={busy}
            className="text-label mt-8 border-b border-accent pb-1 text-foreground transition-colors hover:text-accent disabled:opacity-50"
          >
            Entrer
          </button>
          <div className="mt-10">
            <Link to="/" className="text-label text-muted-foreground hover:text-foreground">
              ← Retour à la carte
            </Link>
          </div>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-4xl px-5 py-14 sm:px-6 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
          <h1 className="font-display text-4xl tracking-tight text-foreground sm:text-5xl">
            Gestion de la carte
          </h1>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-label text-muted-foreground hover:text-foreground">
              Voir la carte
            </Link>
            <button
              type="button"
              onClick={async () => {
                await lock({});
                await refresh();
              }}
              className="text-label text-muted-foreground hover:text-foreground"
            >
              Se déconnecter
            </button>
          </div>
        </div>

        {error ? <p className="mt-6 text-xs text-destructive">{error}</p> : null}

        {/* Add */}
        <section className="mt-12">
          <h2 className="text-label text-muted-foreground">Ajouter un article</h2>
          <form onSubmit={handleCreate} className="mt-6 grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="text-label text-muted-foreground">Catégorie</span>
              <select
                value={draft.section_id}
                onChange={(e) => setDraft({ ...draft, section_id: e.target.value })}
                className={`${inputClass} mt-3`}
              >
                {sectionMeta.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-label text-muted-foreground">Sous-groupe</span>
              <input
                required
                value={draft.group_title}
                onChange={(e) => setDraft({ ...draft, group_title: e.target.value })}
                placeholder="Cafés, Pizza, Mojito…"
                className={`${inputClass} mt-3`}
              />
            </label>
            <label className="block">
              <span className="text-label text-muted-foreground">Nom</span>
              <input
                required
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                className={`${inputClass} mt-3`}
              />
            </label>
            <label className="block">
              <span className="text-label text-muted-foreground">Prix (DT)</span>
              <input
                required
                value={draft.price}
                onChange={(e) => setDraft({ ...draft, price: e.target.value })}
                placeholder="12"
                className={`${inputClass} mt-3`}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-label text-muted-foreground">
                Description (facultatif)
              </span>
              <input
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                className={`${inputClass} mt-3`}
              />
            </label>
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={busy}
                className="text-label border-b border-accent pb-1 text-foreground transition-colors hover:text-accent disabled:opacity-50"
              >
                Ajouter à la carte
              </button>
            </div>
          </form>
        </section>

        {/* List */}
        <section className="mt-16 space-y-14">
          {grouped.map((section) => (
            <div key={section.id}>
              <h2 className="font-display text-2xl tracking-tight text-foreground">
                {section.title}
              </h2>
              <ul className="mt-6 divide-y divide-border">
                {section.rows.map((row) => (
                  <li key={row.id} className="py-4">
                    {editing?.id === row.id ? (
                      <form onSubmit={handleUpdate} className="grid gap-4 sm:grid-cols-2">
                        <input
                          value={editing.name}
                          onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                          className={inputClass}
                          required
                        />
                        <input
                          value={editing.price}
                          onChange={(e) => setEditing({ ...editing, price: e.target.value })}
                          className={inputClass}
                          required
                        />
                        <input
                          value={editing.group_title}
                          onChange={(e) =>
                            setEditing({ ...editing, group_title: e.target.value })
                          }
                          className={inputClass}
                          required
                        />
                        <select
                          value={editing.section_id}
                          onChange={(e) =>
                            setEditing({ ...editing, section_id: e.target.value })
                          }
                          className={inputClass}
                        >
                          {sectionMeta.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.title}
                            </option>
                          ))}
                        </select>
                        <input
                          value={editing.description}
                          onChange={(e) =>
                            setEditing({ ...editing, description: e.target.value })
                          }
                          placeholder="Description"
                          className={`${inputClass} sm:col-span-2`}
                        />
                        <div className="flex gap-6 sm:col-span-2">
                          <button
                            type="submit"
                            disabled={busy}
                            className="text-label border-b border-accent pb-1 text-foreground hover:text-accent disabled:opacity-50"
                          >
                            Enregistrer
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditing(null)}
                            className="text-label text-muted-foreground hover:text-foreground"
                          >
                            Annuler
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                        <div className="min-w-0">
                          <p className="font-display text-lg text-foreground">
                            {row.name}
                            <span className="text-label ml-3 text-muted-foreground">
                              {row.group_title}
                            </span>
                          </p>
                          {row.description ? (
                            <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted-foreground">
                              {row.description}
                            </p>
                          ) : null}
                        </div>
                        <div className="flex items-center gap-5">
                          <span className="price-tabular text-sm text-foreground">
                            {row.price}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setEditing({
                                id: row.id,
                                section_id: row.section_id,
                                group_title: row.group_title,
                                name: row.name,
                                description: row.description ?? "",
                                price: row.price,
                              })
                            }
                            className="text-label text-muted-foreground hover:text-foreground"
                          >
                            Modifier
                          </button>
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => void handleDelete(row.id)}
                            className="text-label text-muted-foreground hover:text-destructive disabled:opacity-50"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
