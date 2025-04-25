import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HabitList from "./src/components/HabitList";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import OverviewCard from "./src/components/OverviewCard";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { dbName } from "./src/db";
import * as SQLite from "expo-sqlite";
import { useEffect } from "react";
import { useHabits } from "./src/store";

const db = SQLite.openDatabaseSync(dbName);

export default function App() {
  useDrizzleStudio(db);

  const loadHabitsForDate = useHabits((state) => state.loadHabitsForDate);

  useEffect(() => {
    loadHabitsForDate(new Date());
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Good morning!</Text>

        <OverviewCard />
        <HabitList />

        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
