import { StyleSheet, Text, View, FlatList } from "react-native";
import GoalItem from "./GoalItem";

function GoalItems({ goals, deleteGoalHandler }) {
  // Grouping goals by day
  const groupedGoals = goals.reduce((acc, goal) => {
    const date = new Date(goal.dueDate);
    const key = `${date.getDate()} ${date.toLocaleString("default", {
      month: "long",
    })}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(goal);
    return acc;
  }, {});

  // Sorting goals by time within each group
  Object.keys(groupedGoals).forEach((key) => {
    groupedGoals[key].sort((a, b) => {
      const timeA = new Date(a.dueDate).getTime();
      const timeB = new Date(b.dueDate).getTime();
      return timeA - timeB;
    });
  });

  return (
    <View style={styles.goalsContainer}>
      {Object.keys(groupedGoals).length > 0 ? (
        Object.keys(groupedGoals).map((day) => (
          <View key={day}>
            <Text style={styles.dayHeading}>{day}</Text>
            <FlatList
              data={groupedGoals[day]}
              renderItem={(itemData) => (
                <GoalItem
                  index={itemData.item.id}
                  item={itemData.item.text}
                  dueDate={itemData.item.dueDate}
                  deleteGoalHandler={() => deleteGoalHandler(itemData.item.id)}
                />
              )}
            />
          </View>
        ))
      ) : (
        <Text style={styles.noGoalsText}>No goals</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  goalsContainer: {
    flex: 4,
    marginTop: 32,
  },
  dayHeading: {
    fontWeight: "bold",
    color: "#eee",
    alignSelf: "center",
    marginBottom: 4,
  },
  noGoalsText: {
    alignSelf: "center",
    color: "#eee",
  },
});

export default GoalItems;
