import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useHabits } from "../store";

export default function DateSelector() {
  const date = useHabits((state) => state.viewDate);
  const setDate = useHabits((state) => state.setViewDate);

  const onNextDay = () => {
    setDate(dayjs(date).add(1, "day").toDate());
  };

  const onPreviousDay = () => {
    setDate(dayjs(date).subtract(1, "day").toDate());
  };

  const canGoForward = dayjs(date).isBefore(dayjs().startOf("day"), "day");

  return (
    <View style={styles.container}>
      <AntDesign onPress={onPreviousDay} name="left" size={24} color="gray" />
      <Text style={styles.header}>{dayjs(date).format("dddd, D MMMM")}</Text>
      <AntDesign
        onPress={onNextDay}
        disabled={!canGoForward}
        name="right"
        size={24}
        color={canGoForward ? "gray" : "lightgray"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
});
