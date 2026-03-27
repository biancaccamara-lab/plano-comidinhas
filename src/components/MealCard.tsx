import { useState } from "react";
import { Check, ChevronDown, ChevronUp, Pencil, X, BookOpen, Trash2 } from "lucide-react";
import type { Meal } from "@/data/mealPlan";

interface MealCardProps {
  meal: Meal;
  isChecked: boolean;
  onToggle: () => void;
  onToggleItem: (itemIndex: number) => void;
  isItemChecked: (itemIndex: number) => boolean;
  getItemEdit: (itemIndex: number) => { name?: string; portion?: string; calories?: number };
  onEditItem: (itemIndex: number, field: "name" | "portion" | "calories", value: string) => void;
}

const typeStyles: Record<Meal["type"], string> = {
  breakfast: "meal-card-breakfast",
  lunch: "meal-card-lunch",
  snack: "meal-card-snack",
  dinner: "meal-card-dinner",
};

const typeEmoji: Record<Meal["type"], string> = {
  breakfast: "☕",
  lunch: "🍽️",
  snack: "🍎",
  dinner: "🌙",
};

const typeBgGradient: Record<Meal["type"], string> = {
  breakfast: "from-yellow-50 to-orange-50",
  lunch: "from-green-50 to-emerald-50",
  snack: "from-purple-50 to-pink-50",
  dinner: "from-blue-50 to-indigo-50",
};

export default function MealCard({
  meal,
  isChecked,
  onToggle,
  onToggleItem,
  isItemChecked,
  getItemEdit,
  onEditItem,
}: MealCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Calculate total calories of items NOT removed
  const totalCaloriesAvailable = meal.items.reduce((sum, item, i) => {
    if (isItemChecked(i)) return sum; // Skip removed items
    const edit = getItemEdit(i);
    return sum + (edit.calories !== undefined ? edit.calories : (item.calories || 0));
  }, 0);

  // If meal is checked, all available items (not removed) are consumed
  const consumedCalories = isChecked ? totalCaloriesAvailable : 0;

  return (
    <div
      className={`w-full text-left rounded-2xl transition-all duration-300 overflow-hidden ${typeStyles[meal.type]} ${
        isChecked 
          ? `checked-meal` 
          : `bg-gradient-to-br ${typeBgGradient[meal.type]} smooth-shadow hover:smooth-shadow-lg`
      }`}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full text-left p-5 pb-3 flex items-start justify-between gap-4 hover:opacity-90 transition-opacity"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-2xl">{typeEmoji[meal.type]}</span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{meal.time}</span>
            {meal.isOption && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-secondary/30 text-secondary-foreground font-medium">
                {meal.optionLabel}
              </span>
            )}
          </div>
          <h3 className={`font-semibold text-lg transition-all ${isChecked ? "line-through text-muted-foreground opacity-60" : "text-foreground"}`}>
            {meal.name}
          </h3>
        </div>

        <div
          className={`mt-1 w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 font-bold ${
            isChecked 
              ? "bg-gradient-to-br from-primary to-accent border-primary shadow-lg scale-110" 
              : "border-muted-foreground/30 hover:border-primary/50"
          }`}
        >
          {isChecked && <Check className="w-5 h-5 text-white" />}
        </div>
      </button>

      {/* Expand & recipe toggle */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-white/30">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
            <span className="text-sm">🔥</span>
            <span className="text-primary font-bold">{consumedCalories}/{totalCaloriesAvailable}</span>
            <span className="text-muted-foreground">kcal</span>
          </div>
          <span className="ml-1 flex items-center gap-1">
            {expanded ? "Recolher" : "Ver itens"}
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </span>
        </button>

        {meal.recipe && (
          <button
            onClick={() => setShowRecipe(!showRecipe)}
            className={`flex items-center gap-1.5 text-xs font-semibold transition-all px-2.5 py-1.5 rounded-lg ${
              showRecipe 
                ? "text-accent bg-accent/10" 
                : "text-muted-foreground hover:text-foreground hover:bg-white/50"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Receita
          </button>
        )}
      </div>

      {/* Recipe */}
      {showRecipe && meal.recipe && (
        <div className="mx-5 my-3 p-4 rounded-xl bg-white/60 border border-primary/10">
          <p className="text-xs text-foreground leading-relaxed">{meal.recipe}</p>
        </div>
      )}

      {/* Items list */}
      {expanded && (
        <div className="px-5 pb-5 space-y-2 border-t border-white/30 pt-3">
          {meal.items.map((item, i) => {
            const edit = getItemEdit(i);
            const displayName = edit.name || item.name;
            const displayPortion = edit.portion || item.portion;
            const itemRemoved = isItemChecked(i);
            const isEditing = editingIndex === i;

            // Don't show removed items
            if (itemRemoved) {
              return null;
            }

            return (
              <div
                key={i}
                className={`flex items-center gap-3 text-sm rounded-xl px-3.5 py-3 transition-all ${
                  isChecked 
                    ? "bg-primary/10 border border-primary/20" 
                    : "bg-white/50 hover:bg-white/80 border border-white/50"
                }`}
              >
                <button
                  onClick={() => onToggleItem(i)}
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all font-bold ${
                    isChecked 
                      ? "bg-primary/20 border-primary/40 text-primary hover:bg-primary/30" 
                      : "border-muted-foreground/30 hover:border-destructive/50 hover:bg-destructive/5"
                  }`}
                  title="Remover este item"
                >
                  {isChecked && <Trash2 className="w-3.5 h-3.5" />}
                </button>

                {isEditing ? (
                  <div className="flex-1 flex flex-col gap-2">
                    <input
                      className="text-sm bg-white border border-primary/20 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary/30"
                      defaultValue={displayName}
                      onBlur={(e) => onEditItem(i, "name", e.target.value)}
                      placeholder="Nome do item"
                      autoFocus
                    />
                    <input
                      className="text-xs bg-white border border-primary/20 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary/30"
                      defaultValue={displayPortion}
                      onBlur={(e) => onEditItem(i, "portion", e.target.value)}
                      placeholder="Porção"
                    />
                    <input
                      className="text-xs bg-white border border-primary/20 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary/30"
                      type="number"
                      defaultValue={edit.calories !== undefined ? edit.calories : (item.calories || 0)}
                      onBlur={(e) => onEditItem(i, "calories", e.target.value)}
                      placeholder="Calorias"
                    />
                  </div>
                ) : (
                  <div className="flex-1 flex items-baseline justify-between gap-3 min-w-0">
                    <span className={isChecked ? "line-through text-muted-foreground opacity-60" : "text-foreground font-medium"}>
                      {displayName}
                    </span>
                    <span className="text-muted-foreground text-xs shrink-0 flex gap-2 items-center">
                      <span className="opacity-70">{displayPortion}</span>
                      <span className="px-2 py-1 rounded-lg bg-primary/15 text-primary font-bold">
                        {edit.calories !== undefined ? edit.calories : (item.calories || 0)} kcal
                      </span>
                    </span>
                  </div>
                )}

                <button
                  onClick={() => setEditingIndex(isEditing ? null : i)}
                  className="shrink-0 text-muted-foreground hover:text-primary transition-colors p-1.5 hover:bg-white/50 rounded-lg"
                >
                  {isEditing ? <X className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
