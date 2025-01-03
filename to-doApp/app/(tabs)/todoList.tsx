import { StyleSheet, FlatList, View, Animated} from 'react-native';
import { ThemedView } from "@/components/ThemedView";
import { Button, CheckBox } from 'react-native-elements';
import { useTodoContext } from '../TodoContext';
import * as Animatable from "react-native-animatable";
import { useRef } from 'react';
import Header from '../Header';

export default function ListScreen() {
  const { todos, toggleTodo, clearCompleted } = useTodoContext();

  // Ref for managing fade-in animation execution
  const fadeInAnimation = useRef(false);

  // Ref for managing strikethrough line width animation values
  const strikethroughAnimations = useRef(
    todos.reduce((acc, todo) => {
      acc[todo.id] = new Animated.Value(todo.completed ? 1 : 0); // Start with 1 if completed, 0 otherwise
      return acc;
    }, {} as Record<string, Animated.Value>)
  ).current;

  const handleToggleTodo = (id: string) => {
    fadeInAnimation.current = true;
    const completed = !todos.find((todo) => todo.id === id)?.completed;

    // Animate the strikethrough line
    Animated.timing(strikethroughAnimations[id], {
      toValue: completed ? 1 : 0, // 1 for full width, 0 for hidden
      duration: 500,
      useNativeDriver: false, // Can't use native driver for width
    }).start();

    toggleTodo(id);
  };

  const handleClearCompleted = () => {
    fadeInAnimation.current = false;
    clearCompleted();
  };

  const AnimatedView = Animatable.createAnimatableComponent(View);

  return (
    <ThemedView style={styles.container}>
      <Header title="To-do List" />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if (fadeInAnimation.current) {
            // Render without fade-in
            return (
              <ThemedView style={styles.todoItem}>
                <CheckBox
                  checked={item.completed}
                  onPress={() => handleToggleTodo(item.id)}
                  containerStyle={styles.checkbox}
                />
                <View style={{ flex: 1, position: "relative" }}>
                  {/* Text */}
                  <Animated.Text style={[styles.todoText, { color: item.completed ? "gray" : "white" }]}>
                    {item.text}
                  </Animated.Text>

                  {/* Animated Strikethrough Line */}
                  <Animated.View
                    style={[
                      styles.strikethroughLine,
                      {
                        width: strikethroughAnimations[item.id].interpolate({
                          inputRange: [0, 1],
                          outputRange: ["0%", "100%"], // Animate from 0% to 100% width
                        }),
                      },
                    ]}
                  />
                </View>
              </ThemedView>
            );
          } else {
            // Render with fade-in animation
            return (
              <AnimatedView animation="fadeInDown" duration={2000}>
                <ThemedView style={styles.todoItem}>
                  <CheckBox
                    checked={item.completed}
                    onPress={() => handleToggleTodo(item.id)}
                    containerStyle={styles.checkbox}
                  />
                  <View style={{ flex: 1, position: "relative" }}>
                    {/* Text */}
                    <Animated.Text style={[styles.todoText, { color: item.completed ? "gray" : "white" }]}>
                      {item.text}
                    </Animated.Text>

                    {/* Animated Strikethrough Line */}
                    <Animated.View
                      style={[
                        styles.strikethroughLine,
                        {
                          width: strikethroughAnimations[item.id].interpolate({
                            inputRange: [0, 1],
                            outputRange: ["0%", "100%"], // Animate from 0% to 100% width
                          }),
                        },
                      ]}
                    />
                  </View>
                </ThemedView>
              </AnimatedView>
            );
          }
        }}
      />
      <Button
        title="Clear completed To-do's"
        onPress={handleClearCompleted}
        style={styles.buttonContainer}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#151718",
    borderRadius: 8,
    alignSelf: "flex-start"
  },
  checkbox: {
    padding: 0,
    marginRight: 12,
  },
  todoText: {
    fontSize: 16,
    color: "white",
  },
  strikethroughLine: {
    position: "absolute",
    height: 1,
    backgroundColor: "white",
    bottom: 8, // Adjust to position the line over the text
    left: 0,
  },
  buttonContainer: {
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 16,
  },
});