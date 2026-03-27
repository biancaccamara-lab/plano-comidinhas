import { useState, useEffect } from "react";

const STORAGE_KEY = "meal-tracker-checks";

interface CheckedMeals {
  [dateKey: string]: string[]; // dateKey -> array of meal IDs
}

export function useMealChecks() {
  const [checked, setChecked] = useState<CheckedMeals>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  const todayKey = new Date().toISOString().split("T")[0];

  const toggleMeal = (mealId: string) => {
    setChecked((prev) => {
      const todayChecks = prev[todayKey] || [];
      const isChecked = todayChecks.includes(mealId);
      return {
        ...prev,
        [todayKey]: isChecked
          ? todayChecks.filter((id) => id !== mealId)
          : [...todayChecks, mealId],
      };
    });
  };

  const isMealChecked = (mealId: string, dateKey?: string) => {
    const key = dateKey || todayKey;
    return (checked[key] || []).includes(mealId);
  };

  const getCheckedCount = (dateKey?: string) => {
    const key = dateKey || todayKey;
    return (checked[key] || []).length;
  };

  return { toggleMeal, isMealChecked, getCheckedCount, todayKey };
}
