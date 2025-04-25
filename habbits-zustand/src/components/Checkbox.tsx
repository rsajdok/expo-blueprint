import { StyleSheet, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";

type CheckboxProps = {
  checked?: boolean;
  onPress?: () => void;
};

export default function Checkbox({
  checked = false,
  onPress = () => {},
}: CheckboxProps) {
  return (
    <Pressable
      style={[styles.container, checked && styles.checked]}
      onPress={() => onPress()}
    >
      {checked && <AntDesign name="check" size={20} color="white" />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: "#6B4FFE",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  checked: {
    backgroundColor: "#6B4FFE",
  },
});
