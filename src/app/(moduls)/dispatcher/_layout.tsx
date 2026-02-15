import React from "react";
import { Slot } from "expo-router";
import { View, StyleSheet } from "react-native";

const DispatcherLayout: React.FC = () => {
  return (
    <View style={styles.container}>
      <Slot />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5"
  }
});

export default DispatcherLayout;
