import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Заголовок */}
      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>Добро пожаловать в цифровой водоканал</Text>
      </View>

      {/* Основной контент */}
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>IAS Digital Water Utility</Text>
          <Text style={styles.cardDescription}>
            Единая информационная система мониторинга и автоматизации водоканала
          </Text>
        </View>

        {/* Метрики */}
        <View style={styles.metrics}>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>87%</Text>
            <Text style={styles.metricLabel}>Уровень воды</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>7.2</Text>
            <Text style={styles.metricLabel}>pH</Text>
          </View>
        </View>

        {/* Быстрые действия */}
        <View style={styles.actions}>
          <Link href="/monitoring" style={styles.action}>
            <Text style={styles.actionTitle}>Мониторинг</Text>
            <Text style={styles.actionDesc}>Режим реального времени</Text>
          </Link>
          <Link href="/alerts" style={styles.action}>
            <Text style={styles.actionTitle}>Оповещения</Text>
            <Text style={styles.actionDesc}>Активные инциденты</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  titleContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1E5A8E',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E5A8E',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 15,
    color: '#555',
  },
  metrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metric: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E5A8E',
  },
  metricLabel: {
    fontSize: 14,
    color: '#777',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  action: {
    width: '48%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E5A8E',
    marginBottom: 6,
  },
  actionDesc: {
    fontSize: 13,
    color: '#666',
  },
});
