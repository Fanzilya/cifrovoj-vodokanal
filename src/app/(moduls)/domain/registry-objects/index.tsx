import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DomainRegistryObjectsPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Реестр объектов (domain/registry-objects)</Text>
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

export default DomainRegistryObjectsPage;