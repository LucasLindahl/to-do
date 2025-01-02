import { Image, StyleSheet, Platform, FlatList, View} from 'react-native';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button, CheckBox } from 'react-native-elements';
import { useTodoContext } from '../TodoContext';


export default function ListScreen() {
    const { todos, toggleTodo, clearCompleted} = useTodoContext();

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title">Todo List</ThemedText>
            <FlatList
                data={todos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ThemedView style={styles.todoItem}>
                        <CheckBox
                            checked={item.completed}
                            onPress={() => toggleTodo(item.id)}
                            containerStyle={styles.checkbox}
                        />
                        <ThemedText style={item.completed ? styles.completedText : undefined}>
                            {item.text}
                        </ThemedText>
                    </ThemedView>
                )}
            />
            <View style={styles.buttonContainer}>
                <Button title="Clear completed To-do's" onPress={clearCompleted} />
            </View>
      </ThemedView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    container: {
        flex: 1,
        padding: 16,
      },
      todoItem: {
        flexDirection: 'row',
        padding: 12,
        marginVertical: 8,
        backgroundColor: "000",
        borderRadius: 8,
      },
      checkbox: {
        padding: 0,
        marginRight: 12,
      },
      completedText: {
        textDecorationLine: "line-through",
        color: "gray",
      },
      buttonContainer: {
        marginTop: 16,
      }
  });