import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#151718", //4CAF50
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderRadius: 8
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});