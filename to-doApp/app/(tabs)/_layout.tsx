import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/app-example/components/HapticTab';
import { IconSymbol } from '@/app-example/components/ui/IconSymbol';
import TabBarBackground from '@/app-example/components/ui/TabBarBackground';
import { Colors } from '@/app-example/constants/Colors';
import { useColorScheme } from '@/app-example/hooks/useColorScheme';


export type RootStackParamList = {
  todoList: {
    newTodo?: {
      id: string;
      text: string;
      completed: boolean;
    };
  };
  addTodo: undefined;
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="todoList"
        options={{
          title: 'To-do List',
          tabBarIcon: ({ color }) => (
           <IconSymbol size={28} name="checkmark.circle.fill" color={color} 
           />
        ),
        }}
      />
      <Tabs.Screen
        name="addTodo"
        options={{
          title: "Add To-do",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="plus.circle" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

/*
<Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={14} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={14} name="paperplane.fill" color={color} />,
        }}
      />
*/