import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DomainPassportHardwareIndexPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Паспорт конкретного оборудования</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 18,
    fontWeight: "600"
  }
});

export default DomainPassportHardwareIndexPage;
