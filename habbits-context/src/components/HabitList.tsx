import { FlatList, Text, StyleSheet, View } from 'react-native';
import HabitListItem from './HabitListItem';
import { useHabits } from '../providers/HabitsProvider';
import habits from '../habits';

export default function HabitList() {
  const { habits } = useHabits();

  return (
    <View>
      <Text style={styles.header}>Today's Habits</Text>
      <FlatList
        data={habits}
        renderItem={({ item }) => <HabitListItem habit={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
