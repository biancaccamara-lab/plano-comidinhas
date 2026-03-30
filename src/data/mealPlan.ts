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
  // ===== CAFÉ DA MANHÃ - SEGUNDA =====
  {
    id: "breakfast-mon",
    time: "09:00",
    name: "Café da manhã",
    type: "breakfast",
    showOnDays: [1], // Segunda
    totalCalories: 310,
    items: [
      { name: "Café", portion: "1 xícara (200ml)", calories: 5 },
      { name: "Ovo de galinha", portion: "2 unidades (100g)", calories: 140 },
      { name: "Queijo minas frescal", portion: "1 fatia (30g)", calories: 55 },
      { name: "Pão integral", portion: "1 fatia (25g)", calories: 60 },
    ],
    recipe: "Prepare os ovos mexidos ou cozidos. Sirva com uma fatia de pão integral e queijo minas. Acompanhe com café sem açúcar ou com adoçante.",
  },

  // ===== CAFÉ DA MANHÃ - TERÇA =====
  {
    id: "breakfast-tue",
    time: "09:00",
    name: "Café da manhã",
    type: "breakfast",
    showOnDays: [2], // Terça
    totalCalories: 320,
    items: [
      { name: "Café", portion: "1 xícara (200ml)", calories: 5 },
      { name: "Banana", portion: "1 unidade pequena (80g)", calories: 70 },
      { name: "Ovo de galinha", portion: "1 unidade (50g)", calories: 70 },
      { name: "Aveia em flocos", portion: "3 col. sopa (30g)", calories: 110 },
      { name: "Mel", portion: "1 col. chá (10g)", calories: 30 },
    ],
    recipe: "Misture a aveia com 100ml de leite desnatado. Amasse a banana e misture. Frite o ovo em frigideira antiaderente. Sirva tudo junto com um fio de mel.",
  },

  // ===== CAFÉ DA MANHÃ - QUARTA =====
  {
    id: "breakfast-wed",
    time: "09:00",
    name: "Café da manhã",
    type: "breakfast",
    showOnDays: [3], // Quarta
    totalCalories: 305,
    items: [
      { name: "Café", portion: "1 xícara (200ml)", calories: 5 },
      { name: "Iogurte grego natural", portion: "150g", calories: 100 },
      { name: "Granola caseira", portion: "2 col. sopa (30g)", calories: 120 },
      { name: "Morango", portion: "5 unidades (75g)", calories: 30 },
      { name: "Mel", portion: "1 col. chá (10g)", calories: 30 },
    ],
    recipe: "Coloque o iogurte em uma tigela. Cubra com granola e morangos picados. Finalize com um fio de mel. Acompanhe com café.",
  },

  // ===== CAFÉ DA MANHÃ - QUINTA =====
  {
    id: "breakfast-thu",
    time: "09:00",
    name: "Café da manhã",
    type: "breakfast",
    showOnDays: [4], // Quinta
    totalCalories: 315,
    items: [
      { name: "Café", portion: "1 xícara (200ml)", calories: 5 },
      { name: "Torrada integral", portion: "2 fatias (40g)", calories: 90 },
      { name: "Abacate", portion: "1/2 unidade (60g)", calories: 95 },
      { name: "Ovo cozido", portion: "1 unidade (50g)", calories: 70 },
      { name: "Tomate", portion: "2 fatias (40g)", calories: 8 },
    ],
    recipe: "Tueste o pão integral. Amasse o abacate e espalhe nas torradas. Coloque o ovo cozido fatiado e tomate por cima. Tempere com sal e pimenta.",
  },

  // ===== CAFÉ DA MANHÃ - SEXTA =====
  {
    id: "breakfast-fri",
    time: "09:00",
    name: "Café da manhã",
    type: "breakfast",
    showOnDays: [5], // Sexta
    totalCalories: 300,
    items: [
      { name: "Café", portion: "1 xícara (200ml)", calories: 5 },
      { name: "Pão integral", portion: "1 fatia (25g)", calories: 60 },
      { name: "Queijo branco", portion: "1 fatia (30g)", calories: 50 },
      { name: "Presunto magro", portion: "2 fatias (30g)", calories: 50 },
      { name: "Maçã", portion: "1 unidade pequena (120g)", calories: 65 },
    ],
    recipe: "Monte um sanduíche simples com pão integral, queijo branco e presunto magro. Acompanhe com uma maçã fresca e café.",
  },

  // ===== CAFÉ DA MANHÃ - SÁBADO =====
  {
    id: "breakfast-sat",
    time: "09:00",
    name: "Café da manhã",
    type: "breakfast",
    showOnDays: [6], // Sábado
    totalCalories: 325,
    items: [
      { name: "Café", portion: "1 xícara (200ml)", calories: 5 },
      { name: "Ovo de galinha", portion: "2 unidades (100g)", calories: 140 },
      { name: "Queijo minas frescal", portion: "1 fatia (30g)", calories: 55 },
      { name: "Pão integral", portion: "1 fatia (25g)", calories: 60 },
      { name: "Laranja", portion: "1 unidade pequena (90g)", calories: 40 },
    ],
    recipe: "Prepare os ovos mexidos ou cozidos. Sirva com queijo minas e pão integral. Acompanhe com suco de laranja fresco e café.",
  },

  // ===== CAFÉ DA MANHÃ - DOMINGO =====
  {
    id: "breakfast-sun",
    time: "09:00",
    name: "Café da manhã",
    type: "breakfast",
    showOnDays: [0], // Domingo
    totalCalories: 310,
    items: [
      { name: "Café", portion: "1 xícara (200ml)", calories: 5 },
      { name: "Iogurte natural desnatado", portion: "170g", calories: 85 },
      { name: "Aveia em flocos", portion: "3 col. sopa (30g)", calories: 110 },
      { name: "Banana", portion: "1 unidade pequena (80g)", calories: 70 },
      { name: "Mel", portion: "1 col. chá (10g)", calories: 30 },
    ],
    recipe: "Misture o iogurte com aveia. Pique a banana e distribua por cima. Finalize com um fio de mel. Acompanhe com café.",
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

  // ===== LANCHE - SEGUNDA =====
  {
    id: "snack-mon",
    time: "16:00",
    name: "Lanche",
    type: "snack",
    showOnDays: [1], // Segunda
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

  // ===== LANCHE - TERÇA =====
  {
    id: "snack-tue",
    time: "16:00",
    name: "Lanche",
    type: "snack",
    showOnDays: [2], // Terça
    totalCalories: 340,
    items: [
      { name: "Castanha de caju", portion: "10 unidades (30g)", calories: 160 },
      { name: "Noz", portion: "3 unidades (15g)", calories: 100 },
      { name: "Maçã", portion: "1 unidade pequena (120g)", calories: 65 },
      { name: "Água com limão", portion: "200ml", calories: 0 },
    ],
    recipe: "Combine as castanhas e nozes com a maçã picada. Perfeito para levar na bolsa e comer em qualquer lugar!",
  },

  // ===== LANCHE - QUARTA =====
  {
    id: "snack-wed",
    time: "16:00",
    name: "Lanche",
    type: "snack",
    showOnDays: [3], // Quarta
    totalCalories: 355,
    items: [
      { name: "Leite desnatado", portion: "200ml", calories: 70 },
      { name: "Morango", portion: "100g", calories: 30 },
      { name: "Banana", portion: "1 unidade pequena (80g)", calories: 70 },
      { name: "Whey Protein", portion: "0.5 dosador (15g)", calories: 55 },
      { name: "Mel", portion: "1 col. chá (10g)", calories: 30 },
    ],
    recipe: "Bata o leite com morango, banana, whey e mel no liquidificador. Sirva gelado e pronto para beber!",
  },

  // ===== LANCHE - QUINTA =====
  {
    id: "snack-thu",
    time: "16:00",
    name: "Lanche",
    type: "snack",
    showOnDays: [4], // Quinta
    totalCalories: 345,
    items: [
      { name: "Pão integral", portion: "1 fatia (25g)", calories: 60 },
      { name: "Atum em lata (ao natural)", portion: "1 lata pequena (60g)", calories: 70 },
      { name: "Alface", portion: "2 folhas", calories: 5 },
      { name: "Tomate", portion: "2 fatias (40g)", calories: 8 },
      { name: "Maionese light", portion: "1 col. chá (5g)", calories: 25 },
      { name: "Pêra", portion: "1 unidade pequena (120g)", calories: 60 },
    ],
    recipe: "Misture o atum com um pouco de maionese light. Monte um mini sanduíche com alface, tomate e atum. Acompanhe com uma pêra fresca.",
  },

  // ===== LANCHE - SEXTA =====
  {
    id: "snack-fri",
    time: "16:00",
    name: "Lanche",
    type: "snack",
    showOnDays: [5], // Sexta
    totalCalories: 350,
    items: [
      { name: "Iogurte grego natural", portion: "150g", calories: 100 },
      { name: "Granola caseira", portion: "2 col. sopa (30g)", calories: 120 },
      { name: "Mel", portion: "1 col. chá (10g)", calories: 30 },
      { name: "Amêndoa", portion: "10 unidades (10g)", calories: 60 },
      { name: "Blueberry", portion: "1/2 xícara (50g)", calories: 40 },
    ],
    recipe: "Coloque o iogurte grego em uma tigela. Cubra com granola, amêndoas e blueberries. Finalize com um fio de mel.",
  },

  // ===== LANCHE - SÁBADO =====
  {
    id: "snack-sat",
    time: "16:00",
    name: "Lanche",
    type: "snack",
    showOnDays: [6], // Sábado
    totalCalories: 360,
    items: [
      { name: "Iogurte natural desnatado", portion: "170g", calories: 85 },
      { name: "Uva", portion: "6 unidades (48g)", calories: 30 },
      { name: "Farelo de aveia", portion: "3 col. sopa (30g)", calories: 90 },
      { name: "Whey Protein", portion: "0.5 dosador (15g)", calories: 55 },
      { name: "Chocolate amargo", portion: "4 quadrados (24g)", calories: 90 },
    ],
    recipe: "Misture o iogurte com farelo de aveia e whey protein. Cubra com as uvas cortadas ao meio e os quadrados de chocolate amargo picados.",
  },

  // ===== LANCHE - DOMINGO =====
  {
    id: "snack-sun",
    time: "16:00",
    name: "Lanche",
    type: "snack",
    showOnDays: [0], // Domingo
    totalCalories: 340,
    items: [
      { name: "Leite desnatado", portion: "200ml", calories: 70 },
      { name: "Banana", portion: "1 unidade pequena (80g)", calories: 70 },
      { name: "Aveia em flocos", portion: "3 col. sopa (30g)", calories: 110 },
      { name: "Mel", portion: "1 col. chá (10g)", calories: 30 },
    ],
    recipe: "Misture o leite com aveia e banana. Adicione um fio de mel. Deixe descansar 5 minutos e sirva.",
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
