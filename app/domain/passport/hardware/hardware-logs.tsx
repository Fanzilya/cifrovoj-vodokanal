import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DomainPassportHardwareLogsPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Журнал оборудования</Text>
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

export default DomainPassportHardwareLogsPage;
