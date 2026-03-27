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
      className={`w-full text-left rounded-lg bg-card transition-all duration-200 ${typeStyles[meal.type]} ${
        isChecked ? "checked-meal" : "shadow-sm"
      }`}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full text-left p-4 pb-2 flex items-start justify-between gap-3"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-muted-foreground">{meal.time}</span>
            <span>{typeEmoji[meal.type]}</span>
            {meal.isOption && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                {meal.optionLabel}
              </span>
            )}
          </div>
          <h3 className={`font-semibold text-base ${isChecked ? "line-through text-muted-foreground" : "text-foreground"}`}>
            {meal.name}
          </h3>
        </div>

        <div
          className={`mt-1 w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
            isChecked ? "bg-primary border-primary" : "border-muted-foreground/30"
          }`}
        >
          {isChecked && <Check className="w-4 h-4 text-primary-foreground" />}
        </div>
      </button>

      {/* Expand & recipe toggle */}
      <div className="flex items-center justify-between px-4 py-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          🔥 <span className="font-medium text-accent">{consumedCalories}/{totalCaloriesAvailable} kcal</span>
          <span className="ml-1 flex items-center gap-0.5">
            {expanded ? "Recolher" : "Ver itens"}
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </span>
        </button>

        {meal.recipe && (
          <button
            onClick={() => setShowRecipe(!showRecipe)}
            className={`flex items-center gap-1 text-xs transition-colors ${
              showRecipe ? "text-accent font-medium" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Receita
          </button>
        )}
      </div>

      {/* Recipe */}
      {showRecipe && meal.recipe && (
        <div className="mx-4 mb-3 p-3 rounded-lg bg-accent/10 border border-accent/20">
          <p className="text-xs text-foreground leading-relaxed">{meal.recipe}</p>
        </div>
      )}

      {/* Items list */}
      {expanded && (
        <div className="px-4 pb-4 space-y-1.5">
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
                className={`flex items-center gap-2 text-sm rounded-md px-2 py-1.5 transition-colors ${
                  isChecked ? "bg-primary/5" : "hover:bg-muted/50"
                }`}
              >
                <button
                  onClick={() => onToggleItem(i)}
                  className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                    isChecked ? "bg-primary border-primary" : "border-muted-foreground/30"
                  }`}
                  title="Remover este item"
                >
                  {isChecked && <Trash2 className="w-3 h-3 text-primary-foreground" />}
                </button>

                {isEditing ? (
                  <div className="flex-1 flex flex-col gap-1">
                    <input
                      className="text-sm bg-background border border-input rounded px-2 py-1 w-full"
                      defaultValue={displayName}
                      onBlur={(e) => onEditItem(i, "name", e.target.value)}
                      placeholder="Nome do item"
                      autoFocus
                    />
                    <input
                      className="text-xs bg-background border border-input rounded px-2 py-1 w-full"
                      defaultValue={displayPortion}
                      onBlur={(e) => onEditItem(i, "portion", e.target.value)}
                      placeholder="Porção"
                    />
                    <input
                      className="text-xs bg-background border border-input rounded px-2 py-1 w-full"
                      type="number"
                      defaultValue={edit.calories !== undefined ? edit.calories : (item.calories || 0)}
                      onBlur={(e) => onEditItem(i, "calories", e.target.value)}
                      placeholder="Calorias"
                    />
                  </div>
                ) : (
                  <div className="flex-1 flex items-baseline justify-between gap-2 min-w-0">
                    <span className={isChecked ? "line-through text-muted-foreground" : "text-foreground"}>
                      {displayName}
                    </span>
                    <span className="text-muted-foreground text-xs shrink-0 flex gap-1">
                      <span>{displayPortion}</span>
                      <span className="text-primary font-medium">({edit.calories !== undefined ? edit.calories : (item.calories || 0)} kcal)</span>
                    </span>
                  </div>
                )}

                <button
                  onClick={() => setEditingIndex(isEditing ? null : i)}
                  className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isEditing ? <X className="w-3.5 h-3.5" /> : <Pencil className="w-3.5 h-3.5" />}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
