import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { InputContainerType } from "./setting/input-types";

/** Имена иконок для RN — совместимы с Ionicons (например "mail-outline", "key-outline") */
const DEFAULT_ICON_SIZE = 20;

export const InputContainer: React.FC<InputContainerType> = (props) => {
  return (
    <View style={styles.wrapper}>
      {props.headerText != null && props.headerText !== "" && (
        <Text style={styles.header}>
          {props.isRequired && <Text style={styles.required}>* </Text>}
          {props.headerText}
        </Text>
      )}

      <View style={styles.childrenRow}>
        <View style={styles.inputWrap}>
          {props.children}
        </View>

        {props.measure != null && props.measure !== "" && (
          <View style={styles.measure}>
            <Text style={styles.measureText}>{props.measure}</Text>
          </View>
        )}

        {props.iconName != null && props.iconName !== "" && (
          <View style={styles.iconWrap}>
            <Ionicons
              name={props.iconName as keyof typeof Ionicons.glyphMap}
              size={DEFAULT_ICON_SIZE}
              color="#6b7280"
            />
          </View>
        )}
      </View>

      <View style={styles.footer}>
        {props.validText != null && props.validText !== "" && (
          <Text style={styles.validText}>{props.validText}</Text>
        )}
        {props.underlineText != null && props.underlineText !== "" && (
          <Text style={styles.underlineText}>{props.underlineText}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginBottom: 4,
  },
  header: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  required: {
    color: "#C30707",
  },
  childrenRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  inputWrap: {
    flex: 1,
    minWidth: 0,
  },
  measure: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 2,
    borderLeftWidth: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderColor: "#e5e7eb",
    justifyContent: "center",
    minHeight: 44,
  },
  measureText: {
    fontSize: 18,
    color: "#374151",
  },
  iconWrap: {
    marginLeft: 8,
    justifyContent: "center",
  },
  footer: {
    marginTop: 4,
  },
  validText: {
    fontSize: 12,
    color: "#CB0D0D",
    marginBottom: 4,
  },
  underlineText: {
    fontSize: 12,
    color: "#757575",
    marginBottom: 4,
  },
});
