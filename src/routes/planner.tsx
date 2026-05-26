import { createFileRoute, Link } from "@tanstack/react-router";
import { Shuffle } from "lucide-react";
import { useMemo } from "react";
import { meals, getMealsByCategory, type MealCategory } from "@/data/meals";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const Route = createFileRoute("/planner")({
  component: Planner,
  head: () => ({ meta: [{ title: "Weekly Planner — Naija Meal Time" }] }),
});

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const slots: MealCategory[] = ["breakfast", "lunch", "dinner"];

type Plan = Record<string, string>; // `${day}-${slot}` -> mealId

function buildRandomPlan(): Plan {
  const plan: Plan = {};
  days.forEach((d) => {
    slots.forEach((s) => {
      const pool = getMealsByCategory(s);
      plan[`${d}-${s}`] = pool[Math.floor(Math.random() * pool.length)].id;
    });
  });
  return plan;
}

function Planner() {
  const [plan, setPlan] = useLocalStorage<Plan>("nmt-plan", {});
  const hasPlan = useMemo(() => Object.keys(plan).length > 0, [plan]);

  const generate = () => setPlan(buildRandomPlan());
  const reroll = (key: string, slot: MealCategory) => {
    const pool = getMealsByCategory(slot);
    const next = pool[Math.floor(Math.random() * pool.length)];
    setPlan({ ...plan, [key]: next.id });
  };

  return (
    <div className="px-5 pt-[max(1.5rem,env(safe-area-inset-top))]">
      <header className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">This week</p>
          <h1 className="font-display text-3xl">Meal planner</h1>
        </div>
        <button
          onClick={generate}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-soft active:scale-95"
        >
          <Shuffle className="h-3.5 w-3.5" /> {hasPlan ? "Reshuffle" : "Generate"}
        </button>
      </header>

      {!hasPlan && (
        <div className="shadow-soft mt-6 rounded-3xl bg-card p-8 text-center">
          <p className="font-display text-lg">No plan yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Tap <span className="font-medium text-foreground">Generate</span> to build your week of Nigerian meals.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {hasPlan && days.map((d) => (
          <div key={d} className="shadow-soft rounded-3xl bg-card p-4">
            <p className="mb-3 font-display text-lg">{d}</p>
            <div className="space-y-2">
              {slots.map((s) => {
                const key = `${d}-${s}`;
                const meal = meals.find((m) => m.id === plan[key]);
                if (!meal) return null;
                return (
                  <div key={s} className="flex items-center gap-3 rounded-2xl bg-muted/60 p-2">
                    <Link to="/meal/$id" params={{ id: meal.id }} className="h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                      <img src={meal.image} alt={meal.name} className="h-full w-full object-cover" loading="lazy" />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{s}</p>
                      <Link to="/meal/$id" params={{ id: meal.id }} className="block truncate text-sm font-semibold">
                        {meal.name}
                      </Link>
                    </div>
                    <button
                      onClick={() => reroll(key, s)}
                      aria-label="Re-roll"
                      className="grid h-9 w-9 place-items-center rounded-full bg-background text-foreground shadow-soft active:scale-95"
                    >
                      <Shuffle className="h-3.5 w-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
