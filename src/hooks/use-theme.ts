import { useEffect } from "react";
import { useLocalStorage } from "./use-local-storage";

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("nmt-theme", "light");
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);
  return { theme, setTheme, toggle: () => setTheme(theme === "dark" ? "light" : "dark") };
}
