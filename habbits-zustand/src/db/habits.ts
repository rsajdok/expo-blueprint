import { getDB } from ".";
import { Habit } from "../types";

export async function getHabitsForDate(date: Date) {
  try {
    const db = await getDB();

    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const dbHabits = await db.getAllAsync<Habit>(
      `SELECT * FROM habits WHERE date >= ? AND date <= ?`,
      [startOfDay.toISOString(), endOfDay.toISOString()]
    );

    const habits = dbHabits.map((habit) => ({
      ...habit,
      completed: !!habit.completed, // SQLite returns 0 or 1 for boolean. Convert to boolean.
    }));

    return habits;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function insertHabit(habit: Habit) {
  const db = await getDB();
  try {
    await db.runAsync(
      `INSERT INTO habits (id, name, subtitle, icon, completed, date) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        habit.id,
        habit.name,
        habit.subtitle,
        habit.icon,
        habit.completed,
        habit.date,
      ]
    );
  } catch (e) {
    console.log(e);
  }
}

export async function insertHabits(habits: Habit[]) {
  return await Promise.all(habits.map(insertHabit));
}

export async function updateHabit(habit: Habit) {
  const db = await getDB();
  try {
    await db.runAsync(`UPDATE habits SET completed = ? WHERE id = ?`, [
      habit.completed,
      habit.id,
    ]);
  } catch (e) {
    console.log(e);
  }
}
