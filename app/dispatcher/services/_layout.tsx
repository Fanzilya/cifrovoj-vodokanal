import React from "react";
import { Slot } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

const DispatcherServicesLayout: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Заявки и услуги</Text>
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

export default DispatcherServicesLayout;
