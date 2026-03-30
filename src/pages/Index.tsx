import { useState, useEffect } from "react";
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

  // Auto-scroll to today's date in the week view
  useEffect(() => {
    const todayElement = document.getElementById(`day-${todayStr}`);
    if (todayElement) {
      todayElement.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [todayStr]);

  const dayOfWeek = selectedDate.getDay();
  const dayMeals = getMealsForDay(dayOfWeek);
  const mainMeals = dayMeals.filter((m) => !m.isOption);

  // Calculate total daily calories considering edits and removed items
  const totalDailyCalories = dayMeals.reduce((sum, m) => {
    const mealTotal = m.items.reduce((itemSum, item, i) => {
      const edit = getItemEdit(m.id, i, selectedKey);
      const isRemoved = isItemChecked(m.id, i, selectedKey);
      if (isRemoved) return itemSum;
      return itemSum + (edit.calories !== undefined ? edit.calories : (item.calories || 0));
    }, 0);
    return sum + mealTotal;
  }, 0);

  // Calculate consumed calories
  const consumedCaloriesForDay = dayMeals.reduce((sum, m) => {
    if (!isMealChecked(m.id, selectedKey)) {
      return sum;
    }
    
    const mealTotal = m.items.reduce((itemSum, item, i) => {
      const edit = getItemEdit(m.id, i, selectedKey);
      const isRemoved = isItemChecked(m.id, i, selectedKey);
      if (isRemoved) return itemSum;
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
    <div className="min-h-screen pb-12 bg-gradient-to-b from-background via-background to-secondary/10">
      <header className="sticky top-0 z-10 glass-effect border-b border-white/20 px-4 py-5 sm:py-6">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Plano Alimentar
              </h1>
              <p className="text-xs text-muted-foreground">Isadora Miranda • Bianca</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 sm:px-6">
        {/* Calories summary - Premium Dashboard */}
        <div className="mt-6 rounded-2xl bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/15 p-5 sm:p-6 smooth-shadow-lg border border-primary/20">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30">
                <Flame className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Progresso</p>
                <p className="text-sm font-bold text-foreground">{dayLabel}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Refeições</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {getCheckedCount(selectedKey)}/{mainMeals.length}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-3">
            <div className="flex justify-between items-end gap-3">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1.5 font-medium">Consumidas</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{consumedCaloriesForDay}</p>
              </div>
              <div className="flex-1 text-right">
                <p className="text-xs text-muted-foreground mb-1.5 font-medium">Restantes</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">{remainingCalories}</p>
              </div>
            </div>
            <div className="w-full bg-white/60 rounded-full h-3 overflow-hidden border border-primary/10">
              <div
                className="bg-gradient-to-r from-primary via-secondary to-accent h-full transition-all duration-500 ease-out rounded-full shadow-lg"
                style={{
                  width: `${progressPercentage}%`,
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground text-center font-semibold">
              Meta: {totalDailyCalories} kcal
            </p>
          </div>
        </div>

        {/* Week navigation - Improved responsiveness */}
        <div className="mt-8 flex items-center gap-2">
          <button 
            onClick={() => shiftWeek(-1)} 
            className="p-2.5 rounded-lg hover:bg-muted transition-all duration-200 active:scale-95 flex-shrink-0"
          >
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          
          <div className="flex-1 overflow-x-auto scrollbar-hide">
            <div className="flex gap-1.5 pb-1 px-1">
              {weekDates.map((date) => {
                const dateStr = dateToKey(date);
                const isSelected = dateStr === selectedKey;
                const isTodayDate = dateStr === todayStr;
                const dayName = WEEKDAYS[date.getDay()];
                const checkedCount = getCheckedCount(dateStr);

                return (
                  <button
                    key={dateStr}
                    id={`day-${dateStr}`}
                    onClick={() => setSelectedDate(date)}
                    className={`flex flex-col items-center min-w-[3.2rem] px-3 py-3 rounded-xl text-center transition-all duration-200 font-medium active:scale-95 flex-shrink-0 ${
                      isSelected
                        ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg scale-105"
                        : isTodayDate
                        ? "bg-accent/25 text-foreground ring-2 ring-accent/60 hover:bg-accent/35"
                        : "bg-white text-foreground hover:bg-muted/50 smooth-shadow"
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">
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
          </div>

          <button 
            onClick={() => shiftWeek(1)} 
            className="p-2.5 rounded-lg hover:bg-muted transition-all duration-200 active:scale-95 flex-shrink-0"
          >
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Selected day label */}
        <p className="mt-5 text-sm font-semibold text-foreground text-center">
          {isToday ? "📅 Hoje" : `${dayLabel}, ${selectedDate.getDate()}/${selectedDate.getMonth() + 1}`}
        </p>

        {/* Meals for the selected day */}
        <div className="mt-6 space-y-3 sm:space-y-4">
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
        <div className="mt-10 rounded-2xl bg-gradient-to-br from-secondary/20 to-accent/15 p-5 sm:p-6 border border-secondary/20 smooth-shadow">
          <h3 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
            <span className="text-lg">💡</span>
            <span>Dicas de Bem-estar</span>
          </h3>
          <ul className="text-xs text-muted-foreground space-y-2.5">
            <li className="flex gap-2 leading-relaxed">
              <span className="text-primary font-bold mt-0.5">•</span>
              <span>Frutas cítricas após refeições ajudam na absorção do ferro</span>
            </li>
            <li className="flex gap-2 leading-relaxed">
              <span className="text-primary font-bold mt-0.5">•</span>
              <span>Evite café/chá mate logo após o almoço (espere 45 min)</span>
            </li>
            <li className="flex gap-2 leading-relaxed">
              <span className="text-primary font-bold mt-0.5">•</span>
              <span>Coma devagar e mastigue com calma</span>
            </li>
            <li className="flex gap-2 leading-relaxed">
              <span className="text-primary font-bold mt-0.5">•</span>
              <span>Prefira preparações cozidas, assadas ou grelhadas</span>
            </li>
          </ul>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
