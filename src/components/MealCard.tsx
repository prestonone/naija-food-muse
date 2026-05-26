import { Link } from "@tanstack/react-router";
import { Heart, Clock } from "lucide-react";
import type { Meal } from "@/data/meals";
import { useFavorites } from "@/hooks/use-favorites";

interface Props {
  meal: Meal;
  size?: "lg" | "md";
}

export function MealCard({ meal, size = "md" }: Props) {
  const { isFav, toggle } = useFavorites();
  const fav = isFav(meal.id);

  return (
    <Link
      to="/meal/$id"
      params={{ id: meal.id }}
      className={`group relative block overflow-hidden rounded-3xl bg-card shadow-card animate-float-in ${
        size === "lg" ? "aspect-[4/5]" : "aspect-[3/4]"
      }`}
    >
      <img
        src={meal.image}
        alt={meal.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-hero" />
      <button
        onClick={(e) => {
          e.preventDefault();
          toggle(meal.id);
        }}
        aria-label="Favourite"
        className="glass absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full"
      >
        <Heart className={`h-4 w-4 ${fav ? "fill-primary text-primary" : "text-foreground"}`} />
      </button>
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <div className="mb-1 inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider backdrop-blur">
          {meal.category}
        </div>
        <h3 className="font-display text-lg leading-tight">{meal.name}</h3>
        <div className="mt-1 flex items-center gap-1 text-xs text-white/80">
          <Clock className="h-3 w-3" /> {meal.cookingTime}
        </div>
      </div>
    </Link>
  );
}
