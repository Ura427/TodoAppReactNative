import { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

function GoalInput({ setGoals, modalCloseHandler }) {
  const [input, setInput] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [dueTime, setDueTime] = useState(new Date());

  const inputChangeHandler = (enteredText) => {
    setInput(enteredText);
  };

  //   console.log("Date: ", dueDate)
  //   console.log("Time: ", dueTime)

  const addGoalHandler = () => {
    if (input.trim().length < 1) {
      Alert.alert("Goal can't be empty", "Please enter a valid string", [
        {
          text: "Ok",
        },
      ]);
      return;
    }

    console.log("Time ", dueTime);

    // Use UTC methods to get hours, minutes, and seconds
    const hours = dueTime ? dueTime.getUTCHours() : 0;
    const minutes = dueTime ? dueTime.getUTCMinutes() : 0;
    const seconds = dueTime ? dueTime.getUTCSeconds() : 0;

    console.log(`${hours} ${minutes} ${seconds}`);

    const combinedDateTime = new Date(
      Date.UTC(
        dueDate.getUTCFullYear(),
        dueDate.getUTCMonth(),
        dueDate.getUTCDate(),
        hours,
        minutes,
        seconds
      )
    );

    console.log("CombinedDateTime: ", combinedDateTime);

    setGoals((prev) => [
      ...prev,
      { id: new Date(), text: input, dueDate: combinedDateTime },
    ]);
    setInput("");
    setDueDate(new Date());
    setDueTime(new Date());
    modalCloseHandler();
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setShowDatePicker(false);
    setDueDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    console.log("selectedTime: ", selectedTime);
    const currentTime = selectedTime;
    setShowTimePicker(false);
    setDueTime(currentTime);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Input some text"
          style={styles.textInput}
          value={input}
          onChangeText={inputChangeHandler}
          placeholderTextColor={"#eee"}
        />
        <View style={styles.dateTimeButtonsContainer}>
          <Button
            title="Select Due Date"
            onPress={() => setShowDatePicker(true)}
          />
          <Button
            title="Select Due Time"
            onPress={() => setShowTimePicker(true)}
          />
        </View>
      </View>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dueDate}
          mode="date"
          is24Hour
          display="default"
          onChange={onDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dueTime}
          mode="time"
          is24Hour
          display="default"
          onChange={onTimeChange}
        />
      )}

      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <Button title="Add Goal" color={"#00ADB5"} onPress={addGoalHandler} />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            color={"#B50800"}
            onPress={modalCloseHandler}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222831",
  },
  inputContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    width: "100%",
    marginBottom: 28,
  },
  textInput: {
    borderColor: "#eee",
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    color: "#eee",
    backgroundColor: "#222831",
  },
  dateTimeButtonsContainer: {
    marginTop: 24,
    gap: 16,
    width: "40%",
    alignSelf: "center",
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    width: "100%",
  },

  buttonContainer: {
    flex: 1,
  },
});

export default GoalInput;
