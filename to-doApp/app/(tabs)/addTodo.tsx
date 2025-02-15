import React, { useState } from "react";
import { StyleSheet, TextInput, Alert } from "react-native";
import { Button } from "react-native-elements"
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTodoContext } from "../TodoContext";
import Toast from "react-native-toast-message";
import { View } from "react-native-animatable";


export default function AddTodoScreen() {
  const [todoText, setTodoText] = useState("");
  const { addTodo } = useTodoContext();

  const handleAddTodo = () => {
    if (!todoText.trim()) {
      Alert.alert("Error", "Todo cannot be empty!");
      return;
    }
    addTodo(todoText)
    Toast.show({
        type: 'success',
        text1: "Todo added to list!",
        visibilityTime: 3000
    })
    setTodoText("");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Add a New Todo</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Enter your todo"
        value={todoText}
        onChangeText={setTodoText}
      />
      <Button title="Add Todo" onPress={handleAddTodo} style={styles.buttonContainer} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginTop: 4,
    marginBottom: 16,
    color: "white"
  },
  buttonContainer: {
    alignSelf: "center",
  }
});