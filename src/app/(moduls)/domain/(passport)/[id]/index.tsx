import { useLocalSearchParams } from "expo-router/build/hooks";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DomainPassportIndexPage: React.FC = () => {

  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container} className="mt-10">
      <Text style={styles.text}>
        Объект: {id}
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
