import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { meals } from "@/data/meals";

export const Route = createFileRoute("/search")({
  component: Search,
  head: () => ({ meta: [{ title: "Search meals — Naija Meal Time" }] }),
});

function Search() {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return meals;
    return meals.filter(
      (m) =>
        m.name.toLowerCase().includes(term) ||
        m.category.includes(term) ||
        m.ingredients.some((i) => i.toLowerCase().includes(term)),
    );
  }, [q]);

  return (
    <div className="px-5 pt-[max(1.5rem,env(safe-area-inset-top))]">
      <header className="mb-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Find</p>
        <h1 className="font-display text-3xl">Search meals</h1>
      </header>

      <div className="shadow-soft flex items-center gap-2 rounded-full bg-card px-4 py-3">
        <SearchIcon className="h-4 w-4 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try 'jollof', 'beans', 'egusi'…"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        {q && (
          <button onClick={() => setQ("")} aria-label="Clear">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      <div className="mt-5 space-y-3">
        {results.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">No meals match "{q}".</p>
        )}
        {results.map((m) => (
          <Link
            key={m.id}
            to="/meal/$id"
            params={{ id: m.id }}
            className="shadow-soft flex items-center gap-4 rounded-3xl bg-card p-3 transition-transform active:scale-[0.98]"
          >
            <div className="h-16 w-16 overflow-hidden rounded-2xl">
              <img src={m.image} alt={m.name} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.category}</p>
              <p className="font-display text-base leading-tight">{m.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{m.cookingTime} · {m.calories}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
