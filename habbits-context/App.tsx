import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HabitList from './src/components/HabitList';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import OverviewCard from './src/components/OverviewCard';
import HabitsProvider from './src/providers/HabitsProvider';
export default function App() {
  return (
    <SafeAreaProvider>
      <HabitsProvider>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Good morning!</Text>

          <OverviewCard />
          <HabitList />

          <StatusBar style='auto' />
        </SafeAreaView>
      </HabitsProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
