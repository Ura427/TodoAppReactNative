import { useState } from "react";
import { StyleSheet, Text, View, Button, Modal } from "react-native";
import GoalInput from "./components/GoalInput";
import GoalItems from "./components/GoalItems";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);

  const deleteGoalHandler = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const modalCloseHandler = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.appContainer}>
      <Modal
        visible={modalVisible}
        style={styles.modalStyles}
        animationType="fade"
        transparent={false}
      >
        <GoalInput setGoals={setGoals} modalCloseHandler={modalCloseHandler} />
      </Modal>
      <Button
        title="Add Goal"
        onPress={() => setModalVisible((prev) => !prev)}
      />

      <GoalItems goals={goals} deleteGoalHandler={deleteGoalHandler} />
    </View>
  );
}
const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 80,
    paddingHorizontal: 40,
    flex: 1,
    backgroundColor: "#222831",
  },

  modalStyles: {
    flex: 1,
    backgroundColor: "white",
  },
});
