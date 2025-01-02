import React, { createContext, useContext, useState } from "react";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type TodoContextType = {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  clearCompleted: () => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", text: "Buy groceries", completed: false },
    { id: "2", text: "Walk the dog", completed: false },
    { id: "3", text: "Complete React Native project", completed: false },
    { id: "4", text: "Feed the dog", completed: false },
    { id: "5", text: "Train", completed: false },
    { id: "6", text: "Cook dinner", completed: false },
    { id: "7", text: "Bake cake", completed: false },
    { id: "8", text: "Study", completed: false }
  ]);

  const addTodo = (text: string) => {
    setTodos((prev) => [
      ...prev,
      { id: Date.now().toString(), text, completed: false },
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, clearCompleted}}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};