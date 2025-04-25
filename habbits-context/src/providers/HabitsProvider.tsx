import { createContext, useContext, useEffect, useState } from 'react';
import { Habit } from '../types';
import defaultHabits from '../habits';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';

type HabitsContext = {
  habits: Habit[];
  toggleHabit: (id: string) => void;
};

const HabitsContext = createContext<HabitsContext>({
  habits: [],
  toggleHabit: () => {},
});

export default function HabitsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHabits();
  }, []);

  useEffect(() => {
    if (!loading) {
      saveHabits();
    }
  }, [habits, loading]);

  const toggleHabit = (id: string) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const saveHabits = async () => {
    await AsyncStorage.setItem('habits', JSON.stringify(habits));
  };

  const loadHabits = async () => {
    const savedHabits = await AsyncStorage.getItem('habits');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    } else {
      setHabits(defaultHabits);
    }
    setLoading(false);
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <HabitsContext.Provider value={{ habits, toggleHabit }}>
      {children}
    </HabitsContext.Provider>
  );
}

export const useHabits = () => useContext(HabitsContext);
