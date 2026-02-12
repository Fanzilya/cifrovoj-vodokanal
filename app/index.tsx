import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HomePage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DOCKER-MOBILE</Text>
      <Text style={styles.subtitle}>Expo + expo-router стартовый экран</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff"
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: "#666666"
  }
});

export default HomePage;
