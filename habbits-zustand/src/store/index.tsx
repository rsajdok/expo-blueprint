import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import * as Crypto from "expo-crypto";

import { Habit } from "../types";
import defaultHabits from "../habits";
import { getHabitsForDate, insertHabits, updateHabit } from "../db/habits";
import { current } from "immer";
import dayjs from "dayjs";

type State = {
  habits: Habit[];
  viewDate: Date;
};

type Action = {
  toggleHabit: (id: string) => void;
  setViewDate: (date: Date) => void;
  loadHabitsForDate: (date: Date) => void;
};

const today = new Date();

export const displayHabitsSelector = (state: State) => {
  return selectHabitsForDate(state.habits, state.viewDate);
};

export const selectHabitsForDate = (habits: Habit[], date: Date) => {
  return habits.filter((habit) => dayjs(habit.date).isSame(dayjs(date), "day"));
};

export const useHabits = create<State & Action>()(
  immer((set, get) => ({
    habits: [],
    viewDate: today,

    toggleHabit: async (id) => {
      set((state) => {
        const habit = state.habits.find((habit) => habit.id === id);
        if (habit) {
          habit.completed = !habit.completed;
          updateHabit(current(habit));
        }
      });
    },

    setViewDate: async (date) => {
      await get().loadHabitsForDate(date);
      set({ viewDate: date });
    },

    loadHabitsForDate: async (date: Date) => {
      const todayHabits = selectHabitsForDate(get().habits, date);
      if (todayHabits?.length > 0) {
        // habits for this date already loaded
        console.log("habits for this date already loaded");
        return;
      }

      // read from local database
      const habits = await getHabitsForDate(date);
      if (habits.length > 0) {
        console.log("habits for this date loaded from local database");
        set((state) => {
          state.habits.push(...habits);
        });
        return;
      }

      // if no habits for this date, add default habits
      const todayDefaultHabits = defaultHabits.map((habit) => ({
        ...habit,
        id: Crypto.randomUUID(),
        date: date.toISOString(),
        completed: false,
      }));
      await insertHabits(todayDefaultHabits);
      set((state) => {
        state.habits.push(...todayDefaultHabits);
      });
      console.log("default habits for this date added to local database");
    },
  }))
);
