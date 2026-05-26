import { useLocalStorage } from "./use-local-storage";

export function useFavorites() {
  const [favs, setFavs] = useLocalStorage<string[]>("nmt-favorites", []);
  const isFav = (id: string) => favs.includes(id);
  const toggle = (id: string) =>
    setFavs(favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id]);
  return { favs, isFav, toggle };
}
