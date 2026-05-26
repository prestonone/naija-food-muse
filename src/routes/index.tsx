import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Shuffle, Sparkles, ChevronRight } from "lucide-react";
import { meals, getMealsByCategory, getMealsByRegion, type MealCategory } from "@/data/meals";
import { MealCard } from "@/components/MealCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import heroCollage from "@/assets/hero-collage.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Naija Meal Time — What are we eating today?" },
      { name: "description", content: "Discover delicious Nigerian breakfast, lunch and dinner ideas every day." },
    ],
  }),
});

const categories: { key: MealCategory; label: string; emoji: string }[] = [
  { key: "breakfast", label: "Breakfast", emoji: "🌅" },
  { key: "lunch", label: "Lunch", emoji: "🍛" },
  { key: "dinner", label: "Dinner", emoji: "🌙" },
];

function greet() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function Index() {
  const [activeCat, setActiveCat] = useState<MealCategory>("breakfast");
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const catMeals = useMemo(() => getMealsByCategory(activeCat), [activeCat]);
  const [featuredId, setFeaturedId] = useState(catMeals[0].id);

  useEffect(() => {
    setFeaturedId(catMeals[0].id);
  }, [activeCat, catMeals]);

  const featured = catMeals.find((m) => m.id === featuredId) ?? catMeals[0];

  const rotate = () => {
    const pool = catMeals.filter((m) => m.id !== featuredId && !recentIds.includes(m.id));
    const next = (pool.length ? pool : catMeals.filter((m) => m.id !== featuredId))[
      Math.floor(Math.random() * Math.max(1, pool.length || catMeals.length - 1))
    ];
    if (next) {
      setFeaturedId(next.id);
      setRecentIds((r) => [next.id, ...r].slice(0, 2));
    }
  };

  const surprise = () => {
    const m = meals[Math.floor(Math.random() * meals.length)];
    setActiveCat(m.category);
    setFeaturedId(m.id);
  };

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-b-[2.5rem]">
        <img
          src={heroCollage}
          alt="Nigerian dishes collage"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-background" />
        <div className="relative px-5 pb-10 pt-[max(1.25rem,env(safe-area-inset-top))]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-white/80">{greet()} 👋</p>
              <h1 className="mt-1 font-display text-3xl leading-tight text-white">
                What are we<br />eating today?
              </h1>
            </div>
            <ThemeToggle />
          </div>

          <button
            onClick={surprise}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform active:scale-95"
          >
            <Sparkles className="h-4 w-4" /> Surprise me
          </button>
        </div>
      </section>

      {/* Category pills */}
      <div className="no-scrollbar -mt-4 flex gap-2 overflow-x-auto px-5">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setActiveCat(c.key)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              activeCat === c.key
                ? "bg-foreground text-background shadow-soft"
                : "glass text-foreground"
            }`}
          >
            <span className="mr-1.5">{c.emoji}</span>
            {c.label}
          </button>
        ))}
      </div>

      {/* Featured */}
      <section className="px-5 pt-5">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Today's pick</p>
            <h2 className="font-display text-2xl">For {categories.find((c) => c.key === activeCat)?.label.toLowerCase()}</h2>
          </div>
          <button
            onClick={rotate}
            className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-2 text-xs font-semibold text-secondary-foreground shadow-soft transition-transform active:scale-95"
          >
            <Shuffle className="h-3.5 w-3.5" /> Change meal
          </button>
        </div>

        <div key={featured.id} className="animate-float-in">
          <MealCard meal={featured} size="lg" />
        </div>
      </section>

      {/* More in category */}
      <section className="px-5 pt-8">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display text-xl">More ideas</h3>
          <Link to="/search" className="inline-flex items-center text-xs font-medium text-muted-foreground">
            See all <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {catMeals.filter((m) => m.id !== featured.id).map((m) => (
            <MealCard key={m.id} meal={m} />
          ))}
        </div>
      </section>

      {/* Akwa Ibom showcase */}
      <section className="px-5 pt-8">
        <div className="shadow-card overflow-hidden rounded-3xl bg-gradient-warm p-5 text-primary-foreground">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] opacity-80">From the South-South</p>
          <h3 className="font-display text-2xl leading-tight">Akwa Ibom kitchen</h3>
          <p className="mt-1 text-sm opacity-90">Soul-deep soups and leafy classics from the coast.</p>
        </div>
        <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-1">
          {getMealsByRegion("akwa-ibom").map((m) => (
            <Link
              key={m.id}
              to="/meal/$id"
              params={{ id: m.id }}
              className="shadow-soft group relative block w-44 shrink-0 overflow-hidden rounded-3xl bg-card"
            >
              <div className="aspect-[3/4] w-full">
                <img src={m.image} alt={m.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 text-white">
                <p className="text-[10px] uppercase tracking-wider opacity-80">{m.category}</p>
                <p className="font-display text-sm leading-tight">{m.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>



      {/* All categories quick browse */}
      <section className="px-5 pt-8">
        <h3 className="mb-3 font-display text-xl">Browse the table</h3>
        <div className="space-y-3">
          {categories.map((c) => {
            const m = getMealsByCategory(c.key)[0];
            return (
              <button
                key={c.key}
                onClick={() => setActiveCat(c.key)}
                className="shadow-soft flex w-full items-center gap-4 rounded-3xl bg-card p-3 text-left transition-transform active:scale-[0.98]"
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-2xl">
                  <img src={m.image} alt={c.label} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.emoji} {c.label}</p>
                  <p className="font-display text-base">{getMealsByCategory(c.key).length} delicious options</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
