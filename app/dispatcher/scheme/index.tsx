import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DispatcherSchemePage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Технологическая схема (dispatcher/scheme)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  title: {
    fontSize: 20,
    fontWeight: "600"
  }
});

export default DispatcherSchemePage;
