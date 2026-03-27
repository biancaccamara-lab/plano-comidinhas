export interface MealItem {
  name: string;
  portion: string;
  calories?: number;
}

export interface Meal {
  id: string;
  time: string;
  name: string;
  type: "breakfast" | "lunch" | "snack" | "dinner";
  items: MealItem[];
  totalCalories: number;
  isOption?: boolean;
  optionLabel?: string;
  recipe?: string;
  /** If set, only show on these days (0=Sun, 6=Sat) */
  showOnDays?: number[];
}

// Schedule: which option variant shows on which weekdays
// Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6, Sun=0
const WEEKDAYS_ALL = [0, 1, 2, 3, 4, 5, 6];
const FDS = [0, 6]; // sábado e domingo
const WEEKDAYS_ONLY = [1, 2, 3, 4, 5];

export const meals: Meal[] = [
  {
    id: "breakfast",
    time: "09:00",
    name: "Café da manhã",
    type: "breakfast",
    totalCalories: 310,
    items: [
      { name: "Café", portion: "1 xícara (200ml)", calories: 5 },
      { name: "Ovo de galinha", portion: "2 unidades (100g)", calories: 140 },
      { name: "Queijo minas frescal", portion: "1 fatia (30g)", calories: 55 },
      { name: "Pão integral", portion: "1 fatia (25g)", calories: 60 },
    ],
    recipe: "Prepare os ovos mexidos ou cozidos. Sirva com uma fatia de pão integral e queijo minas. Acompanhe com café sem açúcar ou com adoçante.",
  },
  {
    id: "lunch-main",
    time: "14:00",
    name: "Almoço",
    type: "lunch",
    totalCalories: 480,
    showOnDays: [1, 3, 5, 6, 0], // Seg, Qua, Sex, Sáb, Dom
    items: [
      { name: "Salada de folhas", portion: "À vontade", calories: 15 },
      { name: "Vegetais cozidos", portion: "2 escumadeiras (180g)", calories: 50 },
      { name: "Filé de frango grelhado", portion: "1 bife grande (100g)", calories: 165 },
      { name: "Feijão carioca/preto", portion: "1 concha rasa (80g)", calories: 60 },
      { name: "Arroz integral/parboilizado", portion: "3 col. sopa cheias (75g)", calories: 95 },
      { name: "Laranja", portion: "1 unidade pequena (90g)", calories: 40 },
    ],
    recipe: "Tempere o frango com sal, alho e limão. Grelhe em frigideira antiaderente. Cozinhe o arroz integral com alho. Sirva com feijão, salada de folhas verdes e vegetais (brócolis, cenoura, abobrinha) cozidos no vapor.",
  },
  {
    id: "lunch-option",
    time: "14:00",
    name: "Almoço",
    type: "lunch",
    isOption: true,
    optionLabel: "Opção com macarrão",
    showOnDays: [2, 4], // Ter, Qui
    totalCalories: 510,
    items: [
      { name: "Salada de folhas", portion: "À vontade", calories: 15 },
      { name: "Vegetais cozidos", portion: "2 escumadeiras (180g)", calories: 50 },
      { name: "Carne moída sem gordura", portion: "1 filé médio (110g)", calories: 190 },
      { name: "Macarrão cozido", portion: "1 escumadeira cheia (110g)", calories: 155 },
      { name: "Tangerina Ponkã", portion: "1 unidade média (135g)", calories: 50 },
    ],
    recipe: "Refogue a carne moída com alho, cebola e tomate. Cozinhe o macarrão al dente. Misture ou sirva separado. Acompanhe com salada de folhas, vegetais cozidos e tangerina de sobremesa.",
  },
  {
    id: "snack",
    time: "16:00",
    name: "Lanche",
    type: "snack",
    totalCalories: 350,
    items: [
      { name: "Iogurte natural desnatado", portion: "170g", calories: 85 },
      { name: "Uva", portion: "6 unidades (48g)", calories: 30 },
      { name: "Farelo de aveia", portion: "3 col. sopa (30g)", calories: 90 },
      { name: "Whey Protein", portion: "0.5 dosador (15g)", calories: 55 },
      { name: "Chocolate amargo", portion: "4 quadrados (24g)", calories: 90 },
    ],
    recipe: "Misture o iogurte com farelo de aveia e whey protein. Cubra com as uvas cortadas ao meio e os quadrados de chocolate amargo picados.",
  },
  {
    id: "dinner-main",
    time: "21:00",
    name: "Jantar",
    type: "dinner",
    showOnDays: [1, 3, 5], // Seg, Qua, Sex
    totalCalories: 430,
    items: [
      { name: "Vegetais cozidos", portion: "À vontade", calories: 40 },
      { name: "Salada de folhas", portion: "À vontade", calories: 15 },
      { name: "Patinho refogado (moída)", portion: "100g", calories: 215 },
      { name: "Batata inglesa assada", portion: "4 col. servir rasas (160g)", calories: 120 },
    ],
    recipe: "Refogue o patinho moído com alho, cebola e temperos. Corte a batata em cubos, tempere com azeite e alecrim e asse a 200°C por 30 min. Sirva com salada e vegetais cozidos.",
  },
  {
    id: "dinner-crepioca",
    time: "20:00",
    name: "Lanche da noite",
    type: "snack",
    isOption: true,
    optionLabel: "Crepioca / Tortinha",
    showOnDays: [2, 4], // Ter, Qui
    totalCalories: 380,
    items: [
      { name: "Ovo de galinha", portion: "1 unidade (50g)", calories: 70 },
      { name: "Goma de tapioca", portion: "2 col. sopa rasas (30g)", calories: 100 },
      { name: "Frango desfiado", portion: "4 col. sopa cheias (80g)", calories: 130 },
      { name: "Requeijão light", portion: "1 col. sopa (30g)", calories: 40 },
      { name: "Saladas", portion: "À vontade", calories: 15 },
    ],
    recipe: "Misture 1 ovo com 2 col. de goma de tapioca. Despeje em frigideira antiaderente quente e espalhe. Quando firmar, vire. Recheie com frango desfiado e requeijão. Dobre e sirva com salada.",
  },
  {
    id: "dinner-burger",
    time: "21:00",
    name: "Jantar",
    type: "dinner",
    isOption: true,
    optionLabel: "Hambúrguer (fds)",
    showOnDays: FDS, // apenas sábado e domingo
    totalCalories: 450,
    items: [
      { name: "Pão de hambúrguer", portion: "1 unidade (50g)", calories: 135 },
      { name: "Hambúrguer caseiro (magro)", portion: "120g", calories: 210 },
      { name: "Queijo mussarela", portion: "1 fatia (20g)", calories: 55 },
      { name: "Alface + tomate", portion: "À vontade", calories: 10 },
    ],
    recipe: "Misture 120g de carne magra moída com sal, pimenta e cebola ralada. Modele o hambúrguer e grelhe em frigideira quente. Monte no pão com queijo, alface e tomate.",
  },
];

/** Filter meals for a given day of week (0=Sun, 6=Sat) */
export function getMealsForDay(dayOfWeek: number): Meal[] {
  return meals.filter((meal) => {
    if (!meal.showOnDays) return true; // show every day
    return meal.showOnDays.includes(dayOfWeek);
  });
}
