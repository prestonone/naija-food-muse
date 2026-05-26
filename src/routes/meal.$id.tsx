import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, Flame, Heart, UtensilsCrossed } from "lucide-react";
import { getMealById } from "@/data/meals";
import { useFavorites } from "@/hooks/use-favorites";

export const Route = createFileRoute("/meal/$id")({
  loader: ({ params }) => {
    const meal = getMealById(params.id);
    if (!meal) throw notFound();
    return { meal };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.meal.name} — Naija Meal Time` },
          { name: "description", content: loaderData.meal.description },
          { property: "og:image", content: loaderData.meal.image },
        ]
      : [],
  }),
  component: MealDetail,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center p-6 text-center">
      <div>
        <h1 className="font-display text-2xl">Meal not found</h1>
        <Link to="/" className="mt-4 inline-block rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground">
          Back home
        </Link>
      </div>
    </div>
  ),
  errorComponent: () => <div className="p-8 text-center">Couldn't load this meal.</div>,
});

function MealDetail() {
  const { meal } = Route.useLoaderData();
  const { isFav, toggle } = useFavorites();
  const fav = isFav(meal.id);

  return (
    <div className="animate-float-in">
      <div className="relative h-[58vh] overflow-hidden rounded-b-[2.5rem]">
        <img src={meal.image} alt={meal.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-hero" />

        <div className="relative flex items-center justify-between px-5 pt-[max(1rem,env(safe-area-inset-top))]">
          <Link to="/" className="glass grid h-10 w-10 place-items-center rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <button
            onClick={() => toggle(meal.id)}
            className="glass grid h-10 w-10 place-items-center rounded-full"
            aria-label="Favourite"
          >
            <Heart className={`h-4 w-4 ${fav ? "fill-primary text-primary" : ""}`} />
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <span className="inline-block rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider backdrop-blur">
            {meal.category}
          </span>
          <h1 className="mt-2 font-display text-3xl leading-tight">{meal.name}</h1>
        </div>
      </div>

      <div className="space-y-6 px-5 pt-6">
        <p className="text-sm leading-relaxed text-muted-foreground">{meal.description}</p>

        <div className="grid grid-cols-3 gap-2">
          <Stat icon={<Clock className="h-4 w-4" />} label="Cook" value={meal.cookingTime} />
          <Stat icon={<Flame className="h-4 w-4" />} label="Calories" value={meal.calories} />
          <Stat icon={<UtensilsCrossed className="h-4 w-4" />} label="Best at" value={meal.bestTime.split(" ")[0]} />
        </div>

        <div>
          <h2 className="mb-3 font-display text-xl">Ingredients</h2>
          <ul className="space-y-2">
            {meal.ingredients.map((ing: string) => (
              <li key={ing} className="shadow-soft flex items-center gap-3 rounded-2xl bg-card px-4 py-3 text-sm">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-primary">•</span>
                {ing}
              </li>
            ))}
          </ul>
        </div>

        <div className="shadow-soft rounded-3xl bg-gradient-warm p-5 text-primary-foreground">
          <p className="text-xs uppercase tracking-wider opacity-80">Best time to eat</p>
          <p className="mt-1 font-display text-2xl">{meal.bestTime}</p>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="shadow-soft rounded-2xl bg-card p-3 text-center">
      <div className="mx-auto mb-1 grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-xs font-semibold">{value}</p>
    </div>
  );
}
