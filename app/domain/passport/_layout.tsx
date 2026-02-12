import React from "react";
import { Slot } from "expo-router";
import { View, StyleSheet, Text } from "react-native";

const DomainPassportLayout: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Паспорт объекта</Text>
      <Slot />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12
  }
});

export default DomainPassportLayout;
