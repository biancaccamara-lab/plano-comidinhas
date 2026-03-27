import { useState } from "react";
import { meals, getMealsForDay } from "@/data/mealPlan";
import { useMealChecks } from "@/hooks/useMealChecks";
import MealCard from "@/components/MealCard";
import { Flame, ChevronLeft, ChevronRight } from "lucide-react";

const WEEKDAYS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

function getWeekDates(referenceDate: Date) {
  const dayOfWeek = referenceDate.getDay();
  const monday = new Date(referenceDate);
  monday.setDate(referenceDate.getDate() - ((dayOfWeek + 6) % 7));

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function dateToKey(d: Date) {
  return d.toISOString().split("T")[0];
}

export default function Index() {
  const { toggleMeal, toggleItem, isItemChecked, isMealChecked, getCheckedCount, setItemEdit, getItemEdit } = useMealChecks();
  const today = new Date();
  const todayStr = dateToKey(today);

  const [selectedDate, setSelectedDate] = useState(today);
  const selectedKey = dateToKey(selectedDate);
  const weekDates = getWeekDates(selectedDate);

  const dayOfWeek = selectedDate.getDay();
  const dayMeals = getMealsForDay(dayOfWeek);
  const mainMeals = dayMeals.filter((m) => !m.isOption);

  // Calculate total daily calories considering edits and removed items
  const totalDailyCalories = dayMeals.reduce((sum, m) => {
    const mealTotal = m.items.reduce((itemSum, item, i) => {
      const edit = getItemEdit(m.id, i, selectedKey);
      const isRemoved = isItemChecked(m.id, i, selectedKey);
      if (isRemoved) return itemSum; // Skip removed items
      return itemSum + (edit.calories !== undefined ? edit.calories : (item.calories || 0));
    }, 0);
    return sum + mealTotal;
  }, 0);

  // Calculate consumed calories: sum of all meals that are checked
  const consumedCaloriesForDay = dayMeals.reduce((sum, m) => {
    if (!isMealChecked(m.id, selectedKey)) {
      return sum; // Meal not checked, so no calories consumed
    }
    
    // Meal is checked: sum all non-removed items
    const mealTotal = m.items.reduce((itemSum, item, i) => {
      const edit = getItemEdit(m.id, i, selectedKey);
      const isRemoved = isItemChecked(m.id, i, selectedKey);
      if (isRemoved) return itemSum; // Skip removed items
      return itemSum + (edit.calories !== undefined ? edit.calories : (item.calories || 0));
    }, 0);
    return sum + mealTotal;
  }, 0);

  const remainingCalories = Math.max(0, totalDailyCalories - consumedCaloriesForDay);

  const isToday = selectedKey === todayStr;
  const dayLabel = WEEKDAYS[selectedDate.getDay()];

  const shiftWeek = (dir: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + dir * 7);
    setSelectedDate(d);
  };

  return (
    <div className="min-h-screen pb-8">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b px-4 py-4">
        <div className="max-w-lg mx-auto">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Meu Plano Alimentar
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Nutricionista Isadora Miranda • Bianca
          </p>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4">
        {/* Calories summary */}
        <div className="mt-4 rounded-xl bg-card p-4 shadow-sm">
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Consumidas</p>
              <p className="text-xl font-bold text-primary flex items-center gap-1">
                <Flame className="w-4 h-4" />
                {consumedCaloriesForDay} kcal
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Restantes</p>
              <p className="text-xl font-bold text-accent">
                {remainingCalories} kcal
              </p>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-300"
              style={{
                width: `${totalDailyCalories > 0 ? (consumedCaloriesForDay / totalDailyCalories) * 100 : 0}%`,
              }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Meta diária: ~{totalDailyCalories} kcal
          </p>
        </div>

        {/* Week navigation */}
        <div className="mt-6 flex items-center gap-2">
          <button onClick={() => shiftWeek(-1)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="flex-1 flex gap-1.5 overflow-x-auto pb-1">
            {weekDates.map((date) => {
              const dateStr = dateToKey(date);
              const isSelected = dateStr === selectedKey;
              const isTodayDate = dateStr === todayStr;
              const dayName = WEEKDAYS[date.getDay()];
              const checkedCount = getCheckedCount(dateStr);

              return (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDate(date)}
                  className={`flex flex-col items-center min-w-[3.2rem] px-2 py-2 rounded-xl text-center transition-colors ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-md"
                      : isTodayDate
                      ? "bg-accent/15 text-foreground ring-1 ring-accent/30"
                      : "bg-card text-foreground hover:bg-muted"
                  }`}
                >
                  <span className="text-[10px] font-medium uppercase tracking-wide opacity-70">
                    {dayName.slice(0, 3)}
                  </span>
                  <span className="text-lg font-bold leading-tight">{date.getDate()}</span>
                  {checkedCount > 0 && (
                    <span className={`text-[10px] mt-0.5 ${isSelected ? "text-primary-foreground/80" : "text-primary"}`}>
                      {checkedCount}✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <button onClick={() => shiftWeek(1)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Selected day label */}
        <p className="mt-3 text-sm text-muted-foreground text-center">
          {isToday ? "Hoje" : `${dayLabel}, ${selectedDate.getDate()}/${selectedDate.getMonth() + 1}`}
        </p>

        {/* Meals for the selected day */}
        <div className="mt-4 space-y-3">
          {dayMeals.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              isChecked={isMealChecked(meal.id, selectedKey)}
              onToggle={() => toggleMeal(meal.id, selectedKey)}
              onToggleItem={(idx) => toggleItem(meal.id, idx, selectedKey)}
              isItemChecked={(idx) => isItemChecked(meal.id, idx, selectedKey)}
              getItemEdit={(idx) => getItemEdit(meal.id, idx, selectedKey)}
              onEditItem={(idx, field, value) => setItemEdit(meal.id, idx, field, value, selectedKey)}
            />
          ))}
        </div>

        {/* Tips */}
        <div className="mt-8 rounded-xl bg-secondary/50 p-4">
          <h3 className="font-semibold text-sm text-secondary-foreground mb-2">💡 Dicas</h3>
          <ul className="text-xs text-muted-foreground space-y-1.5">
            <li>• Frutas cítricas após refeições ajudam na absorção do ferro</li>
            <li>• Evite café/chá mate logo após o almoço (espere 45 min)</li>
            <li>• Coma devagar e mastigue com calma</li>
            <li>• Prefira preparações cozidas, assadas ou grelhadas</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
