import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Heart, Calendar, Search } from "lucide-react";

const items = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/search", label: "Search", Icon: Search },
  { to: "/planner", label: "Planner", Icon: Calendar },
  { to: "/favorites", label: "Saved", Icon: Heart },
] as const;

export function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-[480px] -translate-x-1/2 px-4 pb-4 pt-2">
      <div className="glass shadow-card flex items-center justify-around rounded-3xl border border-border/60 px-2 py-2">
        {items.map(({ to, label, Icon }) => {
          const active = to === "/" ? path === "/" : path.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={`group flex flex-1 flex-col items-center gap-0.5 rounded-2xl px-3 py-2 transition-all ${
                active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 2} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
