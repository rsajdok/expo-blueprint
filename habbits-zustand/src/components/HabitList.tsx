import { FlatList, Text, StyleSheet, View } from "react-native";
import HabitListItem from "./HabitListItem";
import { useHabits, displayHabitsSelector } from "../store";
import DateSelector from "./DateSelector";
import { useShallow } from "zustand/shallow";

export default function HabitList() {
  const habits = useHabits(useShallow(displayHabitsSelector));

  return (
    <View>
      <DateSelector />
      <FlatList
        data={habits}
        renderItem={({ item }) => <HabitListItem habit={item} />}
      />
    </View>
  );
}
