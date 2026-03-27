import { useState } from "react";
import { Check, ChevronDown, ChevronUp, Pencil, X } from "lucide-react";
import type { Meal } from "@/data/mealPlan";

interface MealCardProps {
  meal: Meal;
  isChecked: boolean;
  onToggle: () => void;
  onToggleItem: (itemIndex: number) => void;
  isItemChecked: (itemIndex: number) => boolean;
  getItemEdit: (itemIndex: number) => { name?: string; portion?: string };
  onEditItem: (itemIndex: number, field: "name" | "portion", value: string) => void;
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
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const consumedCalories = meal.items.reduce((sum, item, i) => {
    if (isItemChecked(i)) return sum + (item.calories || 0);
    return sum;
  }, 0);

  return (
    <div
      className={`w-full text-left rounded-lg bg-card transition-all duration-200 ${typeStyles[meal.type]} ${
        isChecked ? "checked-meal" : "shadow-sm"
      }`}
    >
      {/* Header - toggles meal check */}
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

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <span className="flex items-center gap-1.5">
          🔥 <span className="font-medium text-accent">{consumedCalories}/{meal.totalCalories} kcal</span>
        </span>
        <span className="flex items-center gap-1">
          {expanded ? "Recolher" : "Ver itens"}
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </span>
      </button>

      {/* Items list */}
      {expanded && (
        <div className="px-4 pb-4 space-y-1.5">
          {meal.items.map((item, i) => {
            const edit = getItemEdit(i);
            const displayName = edit.name || item.name;
            const displayPortion = edit.portion || item.portion;
            const itemChecked = isItemChecked(i);
            const isEditing = editingIndex === i;

            return (
              <div
                key={i}
                className={`flex items-center gap-2 text-sm rounded-md px-2 py-1.5 transition-colors ${
                  itemChecked ? "bg-primary/5" : "hover:bg-muted/50"
                }`}
              >
                {/* Item checkbox */}
                <button
                  onClick={() => onToggleItem(i)}
                  className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                    itemChecked
                      ? "bg-primary border-primary"
                      : "border-muted-foreground/30"
                  }`}
                >
                  {itemChecked && <Check className="w-3 h-3 text-primary-foreground" />}
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
                  </div>
                ) : (
                  <div className="flex-1 flex items-baseline justify-between gap-2 min-w-0">
                    <span className={itemChecked ? "line-through text-muted-foreground" : "text-foreground"}>
                      {displayName}
                    </span>
                    <span className="text-muted-foreground text-xs shrink-0">{displayPortion}</span>
                  </div>
                )}

                {/* Edit button */}
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
