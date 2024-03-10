import { View, Text, StyleSheet, Pressable } from "react-native";

function GoalItem({ index, item, dueDate, deleteGoalHandler }) {
  const hours = dueDate.getHours();
  const minutes = dueDate.getMinutes();

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  const formattedTime = `${hours}:${formattedMinutes}`;

  return (
    <View key={index} style={styles.goalContainer}>
      <Pressable
        android_ripple={{ color: "#018187" }}
        onPress={deleteGoalHandler}
      >
        <View style={styles.textsContainer}>
          <Text style={styles.goalText}>{item}</Text>
          <Text style={styles.goalDueDate}>{formattedTime}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  goalText: {
    color: "#fff",
    fontWeight: "bold",
  },
  goalContainer: {
    backgroundColor: "#00ADB5",
    marginBottom: 8,
    borderRadius: 4,
  },
  textsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
  },
  goalDueDate: {
    color: "#eee",
  },
});

export default GoalItem;
