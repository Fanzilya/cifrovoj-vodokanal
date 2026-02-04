import { useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");
const isLargeScreen = width >= 768; // Планшеты и большие телефоны

export default function LoginScreen() {
  const [email, setEmail] = useState("loisbecket@gmail.com");
  const [password, setPassword] = useState("********");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      alert("Пожалуйста, заполните все поля");
      return;
    }
    alert("Вход выполнен успешно!");
  };

  // Адаптивные стили
  const getHeaderMargin = () => {
    if (height <= 600) return 24; // Маленькие экраны
    if (height <= 700) return 32; // Средние экраны
    return 40; // Большие экраны
  };

  const getFormWidth = () => {
    if (width <= 320) return "95%"; // Очень маленькие экраны
    if (width <= 375) return "90%"; // Стандартные телефоны
    if (width <= 414) return "85%"; // Большие телефоны
    return "80%"; // Планшеты и большие экраны
  };

  const getTextSize = (baseSize) => {
    if (width <= 320) return baseSize * 0.9;
    if (width >= 768) return baseSize * 1.1;
    return baseSize;
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Фоновая сетка (точки) */}
          <View style={styles.gridBackground} />

          {/* Логотип и заголовок */}
          <View style={[styles.header, { marginBottom: getHeaderMargin() }]}>
            <Image
              source={require("@/assets/images/icon.png")}
              style={[
                styles.logo,
                {
                  width: isLargeScreen ? 70 : 60,
                  height: isLargeScreen ? 70 : 60,
                  marginBottom: isLargeScreen ? 28 : 24,
                },
              ]}
              resizeMode="contain"
            />
            <Text style={[styles.title, { fontSize: getTextSize(28) }]}>
              Вход в аккаунт
            </Text>
            <Text
              style={[
                styles.subtitle,
                { fontSize: getTextSize(16), lineHeight: getTextSize(24) },
              ]}
            >
              Введите ваш email и пароль для входа
            </Text>
          </View>

          {/* Форма входа */}
          <View style={[styles.formContainer, { width: getFormWidth() }]}>
            {/* Разделитель */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={[styles.dividerText, { fontSize: getTextSize(14) }]}>
                Или войдите с помощью
              </Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Поле email */}
            <TextInput
              style={[
                styles.input,
                {
                  paddingVertical: isLargeScreen ? 16 : 14,
                  paddingHorizontal: isLargeScreen ? 18 : 16,
                  fontSize: getTextSize(16),
                  marginBottom: isLargeScreen ? 18 : 16,
                },
              ]}
              placeholderTextColor="#a0a0a0"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
            />

            {/* Поле пароля */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.input,
                  {
                    paddingVertical: isLargeScreen ? 16 : 14,
                    paddingHorizontal: isLargeScreen ? 18 : 16,
                    fontSize: getTextSize(16),
                  },
                ]}
                placeholderTextColor="#a0a0a0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoComplete="password"
                textContentType="password"
              />
              <TouchableOpacity
                style={[
                  styles.eyeButton,
                  {
                    right: isLargeScreen ? 18 : 16,
                    top: isLargeScreen ? 16 : 14,
                  },
                ]}
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
              >
                <Text style={[styles.eyeIcon, { fontSize: getTextSize(18) }]}>
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Опции */}
            <View
              style={[
                styles.optionsContainer,
                { marginBottom: isLargeScreen ? 22 : 20 },
              ]}
            >
              <View style={styles.rememberContainer}>
                <TouchableOpacity
                  style={[
                    styles.checkbox,
                    {
                      width: isLargeScreen ? 22 : 20,
                      height: isLargeScreen ? 22 : 20,
                      marginRight: isLargeScreen ? 10 : 8,
                    },
                  ]}
                  onPress={() => setRememberMe(!rememberMe)}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.checkboxInner,
                      {
                        width: isLargeScreen ? 14 : 12,
                        height: isLargeScreen ? 14 : 12,
                      },
                      rememberMe && styles.checkboxChecked,
                    ]}
                  />
                </TouchableOpacity>
                <Text
                  style={[styles.rememberText, { fontSize: getTextSize(14) }]}
                >
                  Запомнить меня
                </Text>
              </View>

              <TouchableOpacity activeOpacity={0.7}>
                <Text
                  style={[styles.forgotPassword, { fontSize: getTextSize(14) }]}
                >
                  Забыли пароль?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Кнопка входа */}
            <TouchableOpacity
              style={[
                styles.loginButton,
                {
                  paddingVertical: isLargeScreen ? 18 : 16,
                  marginBottom: isLargeScreen ? 18 : 16,
                },
              ]}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text
                style={[styles.loginButtonText, { fontSize: getTextSize(17) }]}
              >
                Войти
              </Text>
            </TouchableOpacity>

            {/* Регистрация */}
            <View style={styles.signupContainer}>
              <Text style={[styles.signupText, { fontSize: getTextSize(14) }]}>
                Нет аккаунта?
              </Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text
                  style={[styles.signupLink, { fontSize: getTextSize(14) }]}
                >
                  {" "}
                  Зарегистрироваться
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A85F6",
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom:
      Platform.OS === "ios"
        ? Dimensions.get("window").height <= 600
          ? 20
          : 40
        : 20,
  },
  gridBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    opacity: 0.2,
  },
  header: {
    alignItems: "center",
  },
  logo: {
    marginBottom: 24,
  },
  title: {
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: "white",
    maxWidth: 400,
    borderRadius: 20,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E0E6ED",
    borderRadius: 14,
    paddingVertical: 14,
    marginBottom: 20,
  },
  googleLogo: {
    marginRight: 12,
  },
  googleButtonText: {
    color: "#333",
    fontWeight: "500",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E6ED",
  },
  dividerText: {
    color: "#888",
    marginHorizontal: 12,
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E0E6ED",
    borderRadius: 14,
    color: "#2D3748",
    marginBottom: 16,
  },
  passwordContainer: {
    position: "relative",
  },
  eyeButton: {
    position: "absolute",
    zIndex: 10,
  },
  eyeIcon: {
    color: "#888",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    backgroundColor: "#4A85F6",
    borderRadius: 2,
    opacity: 0,
  },
  checkboxChecked: {
    opacity: 1,
  },
  rememberText: {
    color: "#4A5568",
  },
  forgotPassword: {
    color: "#4A85F6",
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#4A85F6",
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#0A2A42",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    fontWeight: "600",
    color: "white",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  signupText: {
    color: "#4A5568",
  },
  signupLink: {
    color: "#4A85F6",
    fontWeight: "500",
  },
});
