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
}

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
  },
  {
    id: "lunch-main",
    time: "14:00",
    name: "Almoço",
    type: "lunch",
    totalCalories: 480,
    items: [
      { name: "Salada de folhas", portion: "À vontade", calories: 15 },
      { name: "Vegetais cozidos", portion: "2 escumadeiras (180g)", calories: 50 },
      { name: "Filé de frango grelhado", portion: "1 bife grande (100g)", calories: 165 },
      { name: "Feijão carioca/preto", portion: "1 concha rasa (80g)", calories: 60 },
      { name: "Arroz integral/parboilizado", portion: "3 col. sopa cheias (75g)", calories: 95 },
      { name: "Laranja", portion: "1 unidade pequena (90g)", calories: 40 },
    ],
  },
  {
    id: "lunch-option",
    time: "14:00",
    name: "Almoço",
    type: "lunch",
    isOption: true,
    optionLabel: "Opção com macarrão",
    totalCalories: 510,
    items: [
      { name: "Salada de folhas", portion: "À vontade", calories: 15 },
      { name: "Vegetais cozidos", portion: "2 escumadeiras (180g)", calories: 50 },
      { name: "Carne moída sem gordura", portion: "1 filé médio (110g)", calories: 190 },
      { name: "Macarrão cozido", portion: "1 escumadeira cheia (110g)", calories: 155 },
      { name: "Tangerina Ponkã", portion: "1 unidade média (135g)", calories: 50 },
    ],
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
  },
  {
    id: "dinner-main",
    time: "21:00",
    name: "Jantar",
    type: "dinner",
    totalCalories: 430,
    items: [
      { name: "Vegetais cozidos", portion: "À vontade", calories: 40 },
      { name: "Salada de folhas", portion: "À vontade", calories: 15 },
      { name: "Patinho refogado (moída)", portion: "100g", calories: 215 },
      { name: "Batata inglesa assada", portion: "4 col. servir rasas (160g)", calories: 120 },
    ],
  },
  {
    id: "dinner-crepioca",
    time: "21:00",
    name: "Jantar",
    type: "dinner",
    isOption: true,
    optionLabel: "Crepioca / Tortinha",
    totalCalories: 380,
    items: [
      { name: "Ovo de galinha", portion: "1 unidade (50g)", calories: 70 },
      { name: "Goma de tapioca", portion: "2 col. sopa rasas (30g)", calories: 100 },
      { name: "Frango desfiado", portion: "4 col. sopa cheias (80g)", calories: 130 },
      { name: "Requeijão light", portion: "1 col. sopa (30g)", calories: 40 },
      { name: "Saladas", portion: "À vontade", calories: 15 },
    ],
  },
  {
    id: "dinner-burger",
    time: "21:00",
    name: "Jantar",
    type: "dinner",
    isOption: true,
    optionLabel: "Hambúrguer (fds)",
    totalCalories: 450,
    items: [
      { name: "Pão de hambúrguer", portion: "1 unidade (50g)", calories: 135 },
      { name: "Hambúrguer caseiro (magro)", portion: "120g", calories: 210 },
      { name: "Queijo mussarela", portion: "1 fatia (20g)", calories: 55 },
      { name: "Alface + tomate", portion: "À vontade", calories: 10 },
    ],
  },
];
