import { Check } from "lucide-react";
import type { Meal } from "@/data/mealPlan";

interface MealCardProps {
  meal: Meal;
  isChecked: boolean;
  onToggle: () => void;
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

export default function MealCard({ meal, isChecked, onToggle }: MealCardProps) {
  return (
    <button
      onClick={onToggle}
      className={`w-full text-left rounded-lg bg-card p-4 transition-all duration-200 ${typeStyles[meal.type]} ${
        isChecked ? "checked-meal" : "shadow-sm hover:shadow-md"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
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

          <ul className="mt-2 space-y-1">
            {meal.items.map((item, i) => (
              <li key={i} className="flex items-baseline justify-between text-sm gap-2">
                <span className={isChecked ? "text-muted-foreground" : "text-foreground"}>
                  {item.name}
                </span>
                <span className="text-muted-foreground text-xs shrink-0">{item.portion}</span>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex items-center gap-1.5">
            <span className="text-xs font-medium text-accent">🔥 {meal.totalCalories} kcal</span>
          </div>
        </div>

        <div
          className={`mt-1 w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
            isChecked
              ? "bg-primary border-primary"
              : "border-muted-foreground/30"
          }`}
        >
          {isChecked && <Check className="w-4 h-4 text-primary-foreground" />}
        </div>
      </div>
    </button>
  );
}
