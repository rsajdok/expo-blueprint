import { View, Text, StyleSheet } from 'react-native';
import { Habit } from '../types';
import Checkbox from './Checkbox';
import { useHabits } from '../providers/HabitsProvider';

type HabitListItemProps = {
  habit: Habit;
};

export default function HabitListItem({ habit }: HabitListItemProps) {
  const { toggleHabit } = useHabits();

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{habit.icon}</Text>
      <View style={styles.content}>
        <Text style={styles.name}>{habit.name}</Text>
        <Text>{habit.subtitle}</Text>
      </View>
      <Checkbox
        checked={habit.completed}
        onPress={() => toggleHabit(habit.id)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  content: {
    flex: 1,
  },
  icon: {
    fontSize: 24,
    backgroundColor: '#EEE9FF',
    padding: 10,
    borderRadius: 100,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
});
