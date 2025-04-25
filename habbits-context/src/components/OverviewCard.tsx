import { View, Text, StyleSheet } from 'react-native';
import ProgressBar from './ProgressBar';
import { useHabits } from '../providers/HabitsProvider';

export default function OverviewCard() {
  const { habits } = useHabits();
  const completedHabits = habits.filter((habit) => habit.completed);
  const progress = completedHabits.length / habits.length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You are almost there!</Text>
      <Text style={styles.subtitle}>
        {completedHabits.length}/{habits.length} habits completed
      </Text>
      <ProgressBar progress={progress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
  },
});
