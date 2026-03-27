import { useState } from "react";
import { meals, getMealsForDay } from "@/data/mealPlan";
import { useMealChecks } from "@/hooks/useMealChecks";
import MealCard from "@/components/MealCard";
import { Flame, ChevronLeft, ChevronRight, Target } from "lucide-react";

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
  const progressPercentage = totalDailyCalories > 0 ? (consumedCaloriesForDay / totalDailyCalories) * 100 : 0;

  const isToday = selectedKey === todayStr;
  const dayLabel = WEEKDAYS[selectedDate.getDay()];

  const shiftWeek = (dir: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + dir * 7);
    setSelectedDate(d);
  };

  return (
    <div className="min-h-screen pb-12">
      <header className="sticky top-0 z-10 glass-effect border-b border-border/50 px-4 py-6">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-5 h-5 text-primary" />
            <h1 className="font-display text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Plano Alimentar
            </h1>
          </div>
          <p className="text-sm text-muted-foreground ml-7">
            Nutricionista Isadora Miranda • Bianca
          </p>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4">
        {/* Calories summary - Modern Card */}
        <div className="mt-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-6 smooth-shadow-lg border border-primary/10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2.5 rounded-xl bg-primary/20">
                <Flame className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Progresso do Dia</p>
                <p className="text-sm text-foreground font-semibold">{dayLabel}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Refeições</p>
              <p className="text-2xl font-bold text-primary">
                {getCheckedCount(selectedKey)}/{mainMeals.length}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-5">
            <div className="flex justify-between items-end mb-2">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Consumidas</p>
                <p className="text-2xl font-bold text-primary">{consumedCaloriesForDay}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground mb-0.5">Restantes</p>
                <p className="text-2xl font-bold text-accent">{remainingCalories}</p>
              </div>
            </div>
            <div className="w-full bg-white/50 rounded-full h-3 overflow-hidden border border-primary/10">
              <div
                className="bg-gradient-to-r from-primary via-primary to-accent h-full transition-all duration-500 ease-out rounded-full"
                style={{
                  width: `${progressPercentage}%`,
                }}
              />
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center font-medium">
            Meta diária: {totalDailyCalories} kcal
          </p>
        </div>

        {/* Week navigation */}
        <div className="mt-8 flex items-center gap-2">
          <button 
            onClick={() => shiftWeek(-1)} 
            className="p-2 rounded-lg hover:bg-muted transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
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
                  className={`flex flex-col items-center min-w-[3.5rem] px-3 py-3 rounded-xl text-center transition-all duration-200 font-medium ${
                    isSelected
                      ? "bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg scale-105"
                      : isTodayDate
                      ? "bg-accent/20 text-foreground ring-2 ring-accent/50 hover:bg-accent/30"
                      : "bg-white text-foreground hover:bg-muted/50 smooth-shadow"
                  }`}
                >
                  <span className="text-[11px] font-semibold uppercase tracking-wider opacity-70">
                    {dayName.slice(0, 3)}
                  </span>
                  <span className="text-lg font-bold leading-tight mt-1">{date.getDate()}</span>
                  {checkedCount > 0 && (
                    <span className={`text-[10px] mt-1 font-bold ${isSelected ? "text-primary-foreground/90" : "text-primary"}`}>
                      {checkedCount}✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <button 
            onClick={() => shiftWeek(1)} 
            className="p-2 rounded-lg hover:bg-muted transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Selected day label */}
        <p className="mt-5 text-sm font-semibold text-foreground text-center">
          {isToday ? "📅 Hoje" : `${dayLabel}, ${selectedDate.getDate()}/${selectedDate.getMonth() + 1}`}
        </p>

        {/* Meals for the selected day */}
        <div className="mt-6 space-y-3">
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
        <div className="mt-10 rounded-2xl bg-gradient-to-br from-secondary/20 to-accent/10 p-5 border border-secondary/20 smooth-shadow">
          <h3 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
            <span>💡</span>
            Dicas de Bem-estar
          </h3>
          <ul className="text-xs text-muted-foreground space-y-2">
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Frutas cítricas após refeições ajudam na absorção do ferro</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Evite café/chá mate logo após o almoço (espere 45 min)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Coma devagar e mastigue com calma</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Prefira preparações cozidas, assadas ou grelhadas</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
