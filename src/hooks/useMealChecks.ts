import { useState, useEffect } from "react";

const STORAGE_KEY = "meal-tracker-checks";
const EDITS_KEY = "meal-tracker-edits";

interface CheckedMeals {
  [dateKey: string]: string[]; // dateKey -> array of meal IDs
}

interface CheckedItems {
  [dateKey: string]: {
    [mealId: string]: string[]; // mealId -> array of item indices that were consumed
  };
}

interface MealEdits {
  [dateKey: string]: {
    [mealId: string]: {
      [itemIndex: number]: { name?: string; portion?: string };
    };
  };
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

  const [checkedItems, setCheckedItems] = useState<CheckedItems>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY + "-items");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const [edits, setEdits] = useState<MealEdits>(() => {
    try {
      const stored = localStorage.getItem(EDITS_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + "-items", JSON.stringify(checkedItems));
  }, [checkedItems]);

  useEffect(() => {
    localStorage.setItem(EDITS_KEY, JSON.stringify(edits));
  }, [edits]);

  const todayKey = new Date().toISOString().split("T")[0];

  const toggleMeal = (mealId: string, dateKey?: string) => {
    const key = dateKey || todayKey;
    setChecked((prev) => {
      const dayChecks = prev[key] || [];
      const isChecked = dayChecks.includes(mealId);
      return {
        ...prev,
        [key]: isChecked
          ? dayChecks.filter((id) => id !== mealId)
          : [...dayChecks, mealId],
      };
    });
  };

  const toggleItem = (mealId: string, itemIndex: number, dateKey?: string) => {
    const key = dateKey || todayKey;
    setCheckedItems((prev) => {
      const dayItems = prev[key] || {};
      const mealItems = dayItems[mealId] || [];
      const indexStr = String(itemIndex);
      const isChecked = mealItems.includes(indexStr);
      return {
        ...prev,
        [key]: {
          ...dayItems,
          [mealId]: isChecked
            ? mealItems.filter((i) => i !== indexStr)
            : [...mealItems, indexStr],
        },
      };
    });
  };

  const isItemChecked = (mealId: string, itemIndex: number, dateKey?: string) => {
    const key = dateKey || todayKey;
    return ((checkedItems[key] || {})[mealId] || []).includes(String(itemIndex));
  };

  const isMealChecked = (mealId: string, dateKey?: string) => {
    const key = dateKey || todayKey;
    return (checked[key] || []).includes(mealId);
  };

  const getCheckedCount = (dateKey?: string) => {
    const key = dateKey || todayKey;
    return (checked[key] || []).length;
  };

  const setItemEdit = (mealId: string, itemIndex: number, field: "name" | "portion", value: string, dateKey?: string) => {
    const key = dateKey || todayKey;
    setEdits((prev) => ({
      ...prev,
      [key]: {
        ...(prev[key] || {}),
        [mealId]: {
          ...((prev[key] || {})[mealId] || {}),
          [itemIndex]: {
            ...(((prev[key] || {})[mealId] || {})[itemIndex] || {}),
            [field]: value,
          },
        },
      },
    }));
  };

  const getItemEdit = (mealId: string, itemIndex: number, dateKey?: string) => {
    const key = dateKey || todayKey;
    return ((edits[key] || {})[mealId] || {})[itemIndex] || {};
  };

  return { toggleMeal, toggleItem, isItemChecked, isMealChecked, getCheckedCount, todayKey, setItemEdit, getItemEdit };
}
