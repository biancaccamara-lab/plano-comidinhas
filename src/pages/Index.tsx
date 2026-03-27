import { meals } from "@/data/mealPlan";
import { useMealChecks } from "@/hooks/useMealChecks";
import MealCard from "@/components/MealCard";
import { Flame } from "lucide-react";

const WEEKDAYS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

function getWeekDates() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

export default function Index() {
  const { toggleMeal, isMealChecked, getCheckedCount } = useMealChecks();
  const weekDates = getWeekDates();
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const mainMeals = meals.filter((m) => !m.isOption);
  const totalDailyCalories = mainMeals.reduce((sum, m) => sum + m.totalCalories, 0);

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
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
        <div className="mt-4 rounded-xl bg-card p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Meta diária estimada</p>
            <p className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Flame className="w-5 h-5 text-accent" />
              ~{totalDailyCalories} kcal
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Feitas hoje</p>
            <p className="text-2xl font-bold text-primary">
              {getCheckedCount()}/{mainMeals.length}
            </p>
          </div>
        </div>

        {/* Week tabs */}
        <div className="mt-6 flex gap-1.5 overflow-x-auto pb-2 -mx-1 px-1">
          {weekDates.map((date) => {
            const dateStr = date.toISOString().split("T")[0];
            const isToday = dateStr === todayStr;
            const dayName = WEEKDAYS[date.getDay()];
            const checkedCount = getCheckedCount(dateStr);

            return (
              <div
                key={dateStr}
                className={`flex flex-col items-center min-w-[3.2rem] px-2 py-2 rounded-xl text-center transition-colors ${
                  isToday
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card text-foreground"
                }`}
              >
                <span className="text-[10px] font-medium uppercase tracking-wide opacity-70">
                  {dayName.slice(0, 3)}
                </span>
                <span className="text-lg font-bold leading-tight">{date.getDate()}</span>
                {checkedCount > 0 && (
                  <span className={`text-[10px] mt-0.5 ${isToday ? "text-primary-foreground/80" : "text-primary"}`}>
                    {checkedCount}✓
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Meals */}
        <div className="mt-6 space-y-3">
          {meals.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              isChecked={isMealChecked(meal.id)}
              onToggle={() => toggleMeal(meal.id)}
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
