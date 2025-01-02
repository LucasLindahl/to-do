import { Image, StyleSheet, Platform, FlatList, View} from 'react-native';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button, CheckBox } from 'react-native-elements';
import { useTodoContext } from '../TodoContext';
import * as Animatable from "react-native-animatable";
import { useState } from 'react';
import Header from '../Header';


export default function ListScreen() {
    const { todos, toggleTodo, clearCompleted} = useTodoContext();

    const [disableAnimation, setDisableAnimation] = useState(false);
    

    const handleToggleTodo = (id: string) => {
      setDisableAnimation(true);
      toggleTodo(id);
    };
    
    const AnimatedView = Animatable.createAnimatableComponent(View);

    return (
        <ThemedView style={styles.container}>
            <Header title="To-do List" />
            <FlatList
                data={todos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <AnimatedView animation="fadeInDown" duration={2000}>
                    <ThemedView style={styles.todoItem}>
                        <CheckBox
                            checked={item.completed}
                            onPress={() => handleToggleTodo(item.id)}
                            containerStyle={styles.checkbox}
                        />
                        <ThemedText style={item.completed ? styles.completedText : undefined}>
                            {item.text}
                        </ThemedText>
                    </ThemedView>
                  </AnimatedView>
                )}
            />
            <Button title="Clear completed To-do's" onPress={clearCompleted} style={styles.buttonContainer}/>
      </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.91,
        padding: 16,
      },
      todoItem: {
        flexDirection: "row",
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: "#151718", // "#808181",
      },
      checkbox: {
        padding: 0,
        marginRight: 12,
      },
      completedText: {
        textDecorationLine: "line-through",
        color: "white",
      },
      buttonContainer: {
        marginTop: 16,
        marginBottom: 16,
        borderRadius: 16
      }
  });