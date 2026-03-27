import { useState } from "react";
import { Check, ChevronDown, ChevronUp, Pencil, X, BookOpen, RotateCcw, Archive } from "lucide-react";
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
  const [showArchived, setShowArchived] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const totalCaloriesAvailable = meal.items.reduce((sum, item, i) => {
    if (isItemChecked(i)) return sum;
    const edit = getItemEdit(i);
    return sum + (edit.calories !== undefined ? edit.calories : (item.calories || 0));
  }, 0);

  const consumedCalories = isChecked ? totalCaloriesAvailable : 0;
  const removedItems = meal.items.filter((_, i) => isItemChecked(i));

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
        className="w-full text-left p-4 sm:p-5 pb-2 flex items-start justify-between gap-3 active:scale-95 transition-transform"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{typeEmoji[meal.type]}</span>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{meal.time}</span>
            {meal.isOption && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-secondary/30 text-secondary-foreground font-medium">
                {meal.optionLabel}
              </span>
            )}
          </div>
          <h3 className={`font-semibold text-lg sm:text-base transition-all ${isChecked ? "line-through text-muted-foreground opacity-60" : "text-foreground"}`}>
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
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-t border-white/30 gap-2 flex-wrap">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors active:scale-95"
        >
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/60 hover:bg-white/80 transition-colors">
            <span className="text-sm">🔥</span>
            <span className="text-primary font-bold">{consumedCalories}/{totalCaloriesAvailable}</span>
            <span className="text-muted-foreground text-xs">kcal</span>
          </div>
          <span className="flex items-center gap-1 ml-1">
            {expanded ? "Recolher" : "Ver itens"}
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </span>
        </button>

        {meal.recipe && (
          <button
            onClick={() => setShowRecipe(!showRecipe)}
            className={`flex items-center gap-1.5 text-xs font-semibold transition-all px-3 py-2 rounded-lg active:scale-95 ${
              showRecipe 
                ? "text-accent bg-accent/10" 
                : "text-muted-foreground hover:text-foreground hover:bg-white/60"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Receita
          </button>
        )}
      </div>

      {/* Recipe */}
      {showRecipe && meal.recipe && (
        <div className="mx-4 sm:mx-5 my-3 p-4 rounded-xl bg-white/70 border border-primary/10">
          <p className="text-xs text-foreground leading-relaxed">{meal.recipe}</p>
        </div>
      )}

      {/* Items list */}
      {expanded && (
        <div className="px-4 sm:px-5 pb-4 space-y-2 border-t border-white/30 pt-3">
          {meal.items.map((item, i) => {
            const edit = getItemEdit(i);
            const displayName = edit.name || item.name;
            const displayPortion = edit.portion || item.portion;
            const itemRemoved = isItemChecked(i);
            const isEditing = editingIndex === i;

            if (itemRemoved) {
              return null;
            }

            return (
              <div
                key={i}
                className={`flex items-center gap-3 text-sm rounded-xl px-3.5 py-3 transition-all ${
                  isChecked 
                    ? "bg-primary/10 border border-primary/20" 
                    : "bg-white/60 hover:bg-white/80 border border-white/50"
                }`}
              >
                <button
                  onClick={() => onToggleItem(i)}
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all font-bold active:scale-95 ${
                    isChecked 
                      ? "bg-primary/20 border-primary/40 text-primary hover:bg-primary/30" 
                      : "border-muted-foreground/30 hover:border-destructive/50 hover:bg-destructive/5"
                  }`}
                  title="Remover este item"
                >
                  {isChecked && <X className="w-4 h-4" />}
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
                      <span className="px-2.5 py-1 rounded-lg bg-primary/15 text-primary font-bold text-xs">
                        {edit.calories !== undefined ? edit.calories : (item.calories || 0)} kcal
                      </span>
                    </span>
                  </div>
                )}

                <button
                  onClick={() => setEditingIndex(isEditing ? null : i)}
                  className="shrink-0 text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-white/50 rounded-lg active:scale-95"
                >
                  {isEditing ? <X className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
                </button>
              </div>
            );
          })}

          {/* Archived items section */}
          {removedItems.length > 0 && (
            <div className="mt-4 pt-3 border-t border-muted/50">
              <button
                onClick={() => setShowArchived(!showArchived)}
                className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors w-full active:scale-95"
              >
                <Archive className="w-4 h-4" />
                <span>Itens Removidos ({removedItems.length})</span>
                {showArchived ? <ChevronUp className="w-3.5 h-3.5 ml-auto" /> : <ChevronDown className="w-3.5 h-3.5 ml-auto" />}
              </button>

              {showArchived && (
                <div className="mt-3 space-y-2 bg-muted/40 rounded-lg p-3">
                  {meal.items.map((item, i) => {
                    const edit = getItemEdit(i);
                    const displayName = edit.name || item.name;
                    const displayPortion = edit.portion || item.portion;
                    const itemRemoved = isItemChecked(i);

                    if (!itemRemoved) return null;

                    return (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs rounded-lg px-3 py-2.5 bg-white/60 hover:bg-white/80 transition-colors"
                      >
                        <span className="text-muted-foreground line-through opacity-70 flex-1 min-w-0">
                          {displayName}
                        </span>
                        <span className="text-muted-foreground text-xs shrink-0 opacity-70">
                          {displayPortion}
                        </span>
                        <span className="text-muted-foreground text-xs font-medium opacity-70 shrink-0">
                          ({edit.calories !== undefined ? edit.calories : (item.calories || 0)} kcal)
                        </span>
                        <button
                          onClick={() => onToggleItem(i)}
                          className="ml-auto shrink-0 p-1.5 rounded-lg hover:bg-primary/20 text-primary hover:text-primary transition-colors active:scale-95"
                          title="Restaurar este item"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
