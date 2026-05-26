import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { meals } from "@/data/meals";
import { MealCard } from "@/components/MealCard";
import { useFavorites } from "@/hooks/use-favorites";

export const Route = createFileRoute("/favorites")({
  component: Favorites,
  head: () => ({ meta: [{ title: "Favourites — Naija Meal Time" }] }),
});

function Favorites() {
  const { favs } = useFavorites();
  const list = meals.filter((m) => favs.includes(m.id));

  return (
    <div className="px-5 pt-[max(1.5rem,env(safe-area-inset-top))]">
      <header className="mb-5">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Your collection</p>
        <h1 className="font-display text-3xl">Saved meals</h1>
      </header>

      {list.length === 0 ? (
        <div className="shadow-soft mt-10 grid place-items-center rounded-3xl bg-card p-10 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
            <Heart className="h-6 w-6" />
          </div>
          <p className="mt-4 font-display text-lg">No favourites yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Tap the heart on any meal to save it here.</p>
          <Link to="/" className="mt-5 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
            Discover meals
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {list.map((m) => <MealCard key={m.id} meal={m} />)}
        </div>
      )}
    </div>
  );
}
