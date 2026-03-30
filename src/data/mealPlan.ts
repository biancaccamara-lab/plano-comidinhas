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
  // ===== CAFÉ DA MANHÃ =====
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

  // ===== ALMOÇO - SEGUNDA =====
  {
    id: "lunch-mon",
    time: "14:00",
    name: "Almoço",
    type: "lunch",
    showOnDays: [1], // Segunda
    totalCalories: 480,
    items: [
      { name: "Salada de folhas", portion: "À vontade", calories: 15 },
      { name: "Vegetais cozidos", portion: "2 escumadeiras (180g)", calories: 50 },
      { name: "Filé de frango grelhado", portion: "1 bife grande (100g)", calories: 165 },
      { name: "Feijão carioca/preto", portion: "1 concha rasa (80g)", calories: 60 },
      { name: "Arroz integral/parboilizado", portion: "3 col. sopa cheias (75g)", calories: 95 },
      { name: "Laranja", portion: "1 unidade pequena (90g)", calories: 40 },
    ],
    recipe: "Tempere o frango com sal, alho e limão. Grelhe em frigideira antiaderente. Cozinhe o arroz integral com alho. Sirva com feijão, salada de folhas verdes e vegetais cozidos no vapor.",
  },

  // ===== ALMOÇO - TERÇA =====
  {
    id: "lunch-tue",
    time: "14:00",
    name: "Almoço",
    type: "lunch",
    showOnDays: [2], // Terça
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

  // ===== ALMOÇO - QUARTA =====
  {
    id: "lunch-wed",
    time: "14:00",
    name: "Almoço",
    type: "lunch",
    showOnDays: [3], // Quarta
    totalCalories: 490,
    items: [
      { name: "Salada de folhas", portion: "À vontade", calories: 15 },
      { name: "Vegetais cozidos", portion: "2 escumadeiras (180g)", calories: 50 },
      { name: "Filé de peixe branco", portion: "1 filé grande (120g)", calories: 155 },
      { name: "Batata doce cozida", portion: "1 unidade pequena (100g)", calories: 90 },
      { name: "Feijão", portion: "1 concha rasa (80g)", calories: 60 },
      { name: "Melancia", portion: "1 fatia pequena (200g)", calories: 30 },
    ],
    recipe: "Tempere o peixe com sal, limão e ervas. Asse a 200°C por 15 min ou grelhe. Cozinhe a batata doce e corte em cubos. Sirva com feijão, salada e vegetais.",
  },

  // ===== ALMOÇO - QUINTA =====
  {
    id: "lunch-thu",
    time: "14:00",
    name: "Almoço",
    type: "lunch",
    showOnDays: [4], // Quinta
    totalCalories: 500,
    items: [
      { name: "Salada de folhas", portion: "À vontade", calories: 15 },
      { name: "Vegetais cozidos", portion: "2 escumadeiras (180g)", calories: 50 },
      { name: "Peito de frango desfiado", portion: "1 peito médio (110g)", calories: 180 },
      { name: "Arroz integral", portion: "3 col. sopa cheias (75g)", calories: 95 },
      { name: "Lentilha cozida", portion: "1 concha rasa (80g)", calories: 65 },
      { name: "Banana", portion: "1 unidade pequena (80g)", calories: 70 },
    ],
    recipe: "Cozinhe o frango e desfie. Refogue com alho e cebola. Cozinhe a lentilha com alho. Sirva com arroz, salada e vegetais. Banana de sobremesa.",
  },

  // ===== ALMOÇO - SEXTA =====
  {
    id: "lunch-fri",
    time: "14:00",
    name: "Almoço",
    type: "lunch",
    showOnDays: [5], // Sexta
    totalCalories: 495,
    items: [
      { name: "Salada de folhas", portion: "À vontade", calories: 15 },
      { name: "Vegetais cozidos", portion: "2 escumadeiras (180g)", calories: 50 },
      { name: "Carne vermelha magra", portion: "1 filé pequeno (100g)", calories: 185 },
      { name: "Batata inglesa assada", portion: "4 col. servir rasas (160g)", calories: 120 },
      { name: "Feijão", portion: "1 concha rasa (80g)", calories: 60 },
      { name: "Maçã", portion: "1 unidade pequena (120g)", calories: 65 },
    ],
    recipe: "Tempere a carne com sal e alho. Grelhe em frigideira quente. Asse a batata com azeite e alecrim. Sirva com feijão, salada e vegetais.",
  },

  // ===== ALMOÇO - SÁBADO =====
  {
    id: "lunch-sat",
    time: "14:00",
    name: "Almoço",
    type: "lunch",
    showOnDays: [6], // Sábado
    totalCalories: 485,
    items: [
      { name: "Salada de folhas", portion: "À vontade", calories: 15 },
      { name: "Vegetais cozidos", portion: "2 escumadeiras (180g)", calories: 50 },
      { name: "Frango com pele grelhado", portion: "1 coxa (120g)", calories: 200 },
      { name: "Arroz branco", portion: "3 col. sopa cheias (75g)", calories: 95 },
      { name: "Feijão", portion: "1 concha rasa (80g)", calories: 60 },
      { name: "Abacaxi", portion: "1 fatia média (100g)", calories: 40 },
    ],
    recipe: "Tempere a coxa com sal, alho e limão. Grelhe até ficar dourada. Cozinhe o arroz. Sirva com feijão, salada e vegetais.",
  },

  // ===== ALMOÇO - DOMINGO =====
  {
    id: "lunch-sun",
    time: "14:00",
    name: "Almoço",
    type: "lunch",
    showOnDays: [0], // Domingo
    totalCalories: 500,
    items: [
      { name: "Salada de folhas", portion: "À vontade", calories: 15 },
      { name: "Vegetais cozidos", portion: "2 escumadeiras (180g)", calories: 50 },
      { name: "Filé de salmão", portion: "1 filé médio (100g)", calories: 200 },
      { name: "Batata doce assada", portion: "1 unidade pequena (100g)", calories: 90 },
      { name: "Feijão", portion: "1 concha rasa (80g)", calories: 60 },
      { name: "Melão", portion: "1 fatia pequena (150g)", calories: 35 },
    ],
    recipe: "Tempere o salmão com sal, limão e ervas. Asse a 200°C por 15 min. Asse a batata doce com azeite. Sirva com feijão, salada e vegetais.",
  },

  // ===== LANCHE =====
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

  // ===== JANTAR - SEGUNDA =====
  {
    id: "dinner-mon",
    time: "21:00",
    name: "Jantar",
    type: "dinner",
    showOnDays: [1], // Segunda
    totalCalories: 430,
    items: [
      { name: "Vegetais cozidos", portion: "À vontade", calories: 40 },
      { name: "Salada de folhas", portion: "À vontade", calories: 15 },
      { name: "Patinho refogado (moída)", portion: "100g", calories: 215 },
      { name: "Batata inglesa assada", portion: "4 col. servir rasas (160g)", calories: 120 },
    ],
    recipe: "Refogue o patinho moído com alho, cebola e temperos. Corte a batata em cubos, tempere com azeite e alecrim e asse a 200°C por 30 min. Sirva com salada e vegetais cozidos.",
  },

  // ===== JANTAR - TERÇA =====
  {
    id: "dinner-tue",
    time: "20:00",
    name: "Lanche da noite",
    type: "snack",
    showOnDays: [2], // Terça
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

  // ===== JANTAR - QUARTA =====
  {
    id: "dinner-wed",
    time: "21:00",
    name: "Jantar",
    type: "dinner",
    showOnDays: [3], // Quarta
    totalCalories: 420,
    items: [
      { name: "Vegetais cozidos", portion: "À vontade", calories: 40 },
      { name: "Salada de folhas", portion: "À vontade", calories: 15 },
      { name: "Frango grelhado desfiado", portion: "100g", calories: 165 },
      { name: "Batata doce cozida", portion: "1 unidade pequena (100g)", calories: 90 },
      { name: "Brócolis cozido", portion: "1 xícara (150g)", calories: 50 },
    ],
    recipe: "Grelhe o frango e desfie. Cozinhe a batata doce em cubos. Cozinhe o brócolis no vapor. Sirva com salada e vegetais.",
  },

  // ===== JANTAR - QUINTA =====
  {
    id: "dinner-thu",
    time: "21:00",
    name: "Jantar",
    type: "dinner",
    showOnDays: [4], // Quinta
    totalCalories: 410,
    items: [
      { name: "Vegetais cozidos", portion: "À vontade", calories: 40 },
      { name: "Salada de folhas", portion: "À vontade", calories: 15 },
      { name: "Filé de peixe branco", portion: "1 filé grande (120g)", calories: 155 },
      { name: "Arroz integral", portion: "2 col. sopa cheias (50g)", calories: 63 },
      { name: "Cenoura cozida", portion: "1 xícara (150g)", calories: 52 },
    ],
    recipe: "Tempere o peixe com sal e limão. Asse a 200°C por 15 min. Cozinhe o arroz com alho. Cozinhe a cenoura no vapor. Sirva com salada.",
  },

  // ===== JANTAR - SEXTA =====
  {
    id: "dinner-fri",
    time: "21:00",
    name: "Jantar",
    type: "dinner",
    showOnDays: [5], // Sexta
    totalCalories: 425,
    items: [
      { name: "Vegetais cozidos", portion: "À vontade", calories: 40 },
      { name: "Salada de folhas", portion: "À vontade", calories: 15 },
      { name: "Carne vermelha magra", portion: "100g", calories: 185 },
      { name: "Batata inglesa cozida", portion: "3 col. servir rasas (120g)", calories: 90 },
      { name: "Abóbora cozida", portion: "1 xícara (150g)", calories: 40 },
    ],
    recipe: "Grelhe a carne com sal e alho. Cozinhe a batata em cubos. Cozinhe a abóbora no vapor. Sirva com salada e vegetais.",
  },

  // ===== JANTAR - SÁBADO =====
  {
    id: "dinner-sat",
    time: "21:00",
    name: "Jantar",
    type: "dinner",
    showOnDays: [6], // Sábado
    totalCalories: 450,
    items: [
      { name: "Pão de hambúrguer", portion: "1 unidade (50g)", calories: 135 },
      { name: "Hambúrguer caseiro (magro)", portion: "120g", calories: 210 },
      { name: "Queijo mussarela", portion: "1 fatia (20g)", calories: 55 },
      { name: "Alface + tomate", portion: "À vontade", calories: 10 },
    ],
    recipe: "Misture 120g de carne magra moída com sal, pimenta e cebola ralada. Modele o hambúrguer e grelhe em frigideira quente. Monte no pão com queijo, alface e tomate.",
  },

  // ===== JANTAR - DOMINGO =====
  {
    id: "dinner-sun",
    time: "21:00",
    name: "Jantar",
    type: "dinner",
    showOnDays: [0], // Domingo
    totalCalories: 440,
    items: [
      { name: "Vegetais cozidos", portion: "À vontade", calories: 40 },
      { name: "Salada de folhas", portion: "À vontade", calories: 15 },
      { name: "Frango com pele assado", portion: "1 coxa (120g)", calories: 200 },
      { name: "Batata doce assada", portion: "1 unidade pequena (100g)", calories: 90 },
      { name: "Abobrinha cozida", portion: "1 xícara (200g)", calories: 35 },
    ],
    recipe: "Tempere a coxa com sal, alho e ervas. Asse a 200°C por 30 min. Asse a batata doce com azeite. Cozinhe a abobrinha no vapor. Sirva com salada.",
  },
];

/** Filter meals for a given day of week (0=Sun, 6=Sat) */
export function getMealsForDay(dayOfWeek: number): Meal[] {
  return meals.filter((meal) => {
    if (!meal.showOnDays) return true; // show every day
    return meal.showOnDays.includes(dayOfWeek);
  });
}
