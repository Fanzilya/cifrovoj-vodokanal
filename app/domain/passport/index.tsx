import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DomainPassportIndexPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Выберите раздел паспорта объекта (документация, информация, участники и т.д.).
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: 16
  }
});

export default DomainPassportIndexPage;
