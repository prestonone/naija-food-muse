import akaraPap from "@/assets/akara-pap.jpg";
import yamEgg from "@/assets/yam-egg.jpg";
import breadTea from "@/assets/bread-tea.jpg";
import jollof from "@/assets/jollof-chicken.jpg";
import ebaEgusi from "@/assets/eba-egusi.jpg";
import friedRice from "@/assets/fried-rice.jpg";
import pepperSoup from "@/assets/pepper-soup.jpg";
import beansPlantain from "@/assets/beans-plantain.jpg";
import ofada from "@/assets/ofada-ayamase.jpg";
import afangSoup from "@/assets/afang-soup.jpg";
import atamaSoup from "@/assets/atama-soup.jpg";
import edikangIkong from "@/assets/edikang-ikong.jpg";
import whiteSoupYam from "@/assets/white-soup-yam.jpg";
import custardBread from "@/assets/custard-bread.jpg";
import akamuBread from "@/assets/akamu-bread.jpg";
import garriSoaking from "@/assets/garri-soaking.jpg";

export type MealCategory = "breakfast" | "lunch" | "dinner";
export type MealRegion = "general" | "akwa-ibom";

export interface Meal {
  id: string;
  name: string;
  category: MealCategory;
  region: MealRegion;
  image: string;
  description: string;
  ingredients: string[];
  cookingTime: string;
  calories: string;
  bestTime: string;
}

export const meals: Meal[] = [
  {
    id: "akara-pap",
    name: "Akara & Pap",
    category: "breakfast",
    region: "general",
    image: akaraPap,
    description:
      "Crispy golden bean cakes paired with smooth, silky pap — a beloved Nigerian breakfast that energises your morning.",
    ingredients: ["Peeled black-eyed beans", "Onions", "Scotch bonnet", "Salt", "Palm oil", "Ogi (pap)", "Sugar / milk"],
    cookingTime: "35 mins",
    calories: "≈ 420 kcal",
    bestTime: "7:00 — 9:00 AM",
  },
  {
    id: "yam-egg",
    name: "Boiled Yam & Egg Sauce",
    category: "breakfast",
    region: "general",
    image: yamEgg,
    description:
      "Soft chunks of boiled yam under a vibrant pepper-and-egg sauce. Warm, hearty and full of flavour.",
    ingredients: ["White yam", "Eggs", "Tomatoes", "Red bell pepper", "Onions", "Vegetable oil", "Seasoning"],
    cookingTime: "30 mins",
    calories: "≈ 510 kcal",
    bestTime: "8:00 — 10:00 AM",
  },
  {
    id: "bread-tea",
    name: "Bread & Tea",
    category: "breakfast",
    region: "general",
    image: breadTea,
    description:
      "Classic agege bread with butter and a warm cup of tea — the easy, comforting morning ritual.",
    ingredients: ["Agege bread", "Butter", "Tea bags / Milo", "Milk", "Sugar"],
    cookingTime: "10 mins",
    calories: "≈ 320 kcal",
    bestTime: "6:30 — 9:00 AM",
  },
  {
    id: "custard-bread",
    name: "Custard & Bread",
    category: "breakfast",
    region: "general",
    image: custardBread,
    description:
      "Silky-smooth custard with a faint vanilla note, served warm with soft sliced bread.",
    ingredients: ["Custard powder", "Hot water", "Sugar", "Milk", "Agege bread"],
    cookingTime: "8 mins",
    calories: "≈ 360 kcal",
    bestTime: "6:30 — 9:00 AM",
  },
  {
    id: "akamu-bread",
    name: "Akamu & Bread",
    category: "breakfast",
    region: "general",
    image: akamuBread,
    description:
      "Smooth fermented corn pap with milk and sugar, paired with fresh agege bread.",
    ingredients: ["Akamu (ogi)", "Hot water", "Milk", "Sugar", "Agege bread"],
    cookingTime: "10 mins",
    calories: "≈ 380 kcal",
    bestTime: "7:00 — 9:00 AM",
  },
  {
    id: "jollof-chicken",
    name: "Jollof Rice & Chicken",
    category: "lunch",
    region: "general",
    image: jollof,
    description:
      "The undisputed star — smoky, tomato-rich jollof rice served with juicy grilled chicken and fried plantain.",
    ingredients: ["Long-grain rice", "Tomatoes", "Red pepper", "Onions", "Chicken", "Bay leaf", "Curry & thyme"],
    cookingTime: "1 hr",
    calories: "≈ 680 kcal",
    bestTime: "12:30 — 2:30 PM",
  },
  {
    id: "eba-egusi",
    name: "Eba & Egusi Soup",
    category: "lunch",
    region: "general",
    image: ebaEgusi,
    description:
      "Smooth eba with a rich melon-seed soup loaded with assorted meat, fish and leafy greens.",
    ingredients: ["Garri", "Egusi (melon seeds)", "Palm oil", "Ugu leaves", "Assorted meat", "Stockfish", "Crayfish"],
    cookingTime: "1 hr 10 mins",
    calories: "≈ 750 kcal",
    bestTime: "1:00 — 3:00 PM",
  },
  {
    id: "fried-rice",
    name: "Fried Rice & Plantain",
    category: "lunch",
    region: "general",
    image: friedRice,
    description:
      "Colourful Nigerian-style fried rice with mixed veggies, served alongside sweet golden plantain.",
    ingredients: ["Parboiled rice", "Mixed vegetables", "Liver", "Curry", "Vegetable oil", "Ripe plantain"],
    cookingTime: "50 mins",
    calories: "≈ 640 kcal",
    bestTime: "12:30 — 2:30 PM",
  },
  {
    id: "afang-soup",
    name: "Afang Soup & Fufu",
    category: "lunch",
    region: "akwa-ibom",
    image: afangSoup,
    description:
      "An Akwa Ibom classic — afang and waterleaf simmered with periwinkles, dryfish and assorted meat. Served with smooth fufu.",
    ingredients: ["Afang leaves", "Waterleaf", "Periwinkles", "Assorted meat", "Stockfish", "Dryfish", "Palm oil", "Crayfish"],
    cookingTime: "1 hr 15 mins",
    calories: "≈ 720 kcal",
    bestTime: "1:00 — 3:00 PM",
  },
  {
    id: "edikang-ikong",
    name: "Edikang Ikong & Pounded Yam",
    category: "lunch",
    region: "akwa-ibom",
    image: edikangIkong,
    description:
      "A regal vegetable soup of ugu and waterleaf, rich with periwinkles, dryfish and assorted meat — served with pounded yam.",
    ingredients: ["Ugu leaves", "Waterleaf", "Periwinkles", "Dryfish", "Assorted meat", "Palm oil", "Crayfish", "Pounded yam"],
    cookingTime: "1 hr 20 mins",
    calories: "≈ 780 kcal",
    bestTime: "1:00 — 3:00 PM",
  },
  {
    id: "white-soup-yam",
    name: "White Soup & Pounded Yam",
    category: "lunch",
    region: "akwa-ibom",
    image: whiteSoupYam,
    description:
      "Afia Efere — a light, fragrant white soup with goat meat and uziza, paired with soft pounded yam.",
    ingredients: ["Goat meat", "Yam (for thickening)", "Uziza leaves", "Pepper soup spice", "Stockfish", "Crayfish", "Pounded yam"],
    cookingTime: "1 hr",
    calories: "≈ 690 kcal",
    bestTime: "1:00 — 3:00 PM",
  },
  {
    id: "pepper-soup",
    name: "Pepper Soup",
    category: "dinner",
    region: "general",
    image: pepperSoup,
    description:
      "Light, spicy and aromatic — pepper soup warms you up and clears the head after a long day.",
    ingredients: ["Goat meat / catfish", "Pepper soup spice", "Scent leaves", "Onions", "Ginger & garlic"],
    cookingTime: "45 mins",
    calories: "≈ 380 kcal",
    bestTime: "7:00 — 9:00 PM",
  },
  {
    id: "beans-plantain",
    name: "Beans & Plantain",
    category: "dinner",
    region: "general",
    image: beansPlantain,
    description:
      "Rich palm-oil beans porridge topped with sweet fried plantain — wholesome and deeply satisfying.",
    ingredients: ["Brown beans", "Palm oil", "Onions", "Pepper", "Crayfish", "Ripe plantain"],
    cookingTime: "1 hr",
    calories: "≈ 540 kcal",
    bestTime: "6:30 — 8:30 PM",
  },
  {
    id: "ofada-ayamase",
    name: "Ofada Rice & Ayamase",
    category: "dinner",
    region: "general",
    image: ofada,
    description:
      "Earthy local ofada rice wrapped in leaves, served with the legendary green pepper ayamase stew.",
    ingredients: ["Ofada rice", "Green bell pepper", "Locust beans (iru)", "Palm oil", "Assorted meat", "Boiled egg"],
    cookingTime: "1 hr 20 mins",
    calories: "≈ 720 kcal",
    bestTime: "7:00 — 9:00 PM",
  },
  {
    id: "atama-soup",
    name: "Atama Soup & Fufu",
    category: "dinner",
    region: "akwa-ibom",
    image: atamaSoup,
    description:
      "A bold Akwa Ibom palm-fruit soup flavoured with fragrant atama leaves, banga and assorted meats.",
    ingredients: ["Atama leaves", "Banga (palm fruit) extract", "Assorted meat", "Periwinkles", "Stockfish", "Crayfish", "Fufu"],
    cookingTime: "1 hr 10 mins",
    calories: "≈ 700 kcal",
    bestTime: "7:00 — 9:00 PM",
  },
  {
    id: "garri-soaking",
    name: "Garri (Cassava Flakes)",
    category: "dinner",
    region: "general",
    image: garriSoaking,
    description:
      "Cool soaked garri with groundnuts and sugar — the timeless Nigerian quick fix any time of day.",
    ingredients: ["Garri (cassava flakes)", "Cold water", "Ice", "Sugar", "Groundnuts / milk"],
    cookingTime: "3 mins",
    calories: "≈ 300 kcal",
    bestTime: "Any time",
  },
];

export const getMealsByCategory = (cat: MealCategory) =>
  meals.filter((m) => m.category === cat);

export const getMealsByRegion = (region: MealRegion) =>
  meals.filter((m) => m.region === region);

export const getMealById = (id: string) => meals.find((m) => m.id === id);
