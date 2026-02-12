import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DispatcherTimModelPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TIM-модель (dispatcher/tim-model)</Text>
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

export default DispatcherTimModelPage;
