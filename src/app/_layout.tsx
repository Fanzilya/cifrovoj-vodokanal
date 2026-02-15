import { HeaderMobile } from "@/packages/shared-components/header/header-mobile";
import { Slot } from "expo-router";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

const RootLayout: React.FC = () => {
  return (
    <SafeAreaProvider>

      <HeaderMobile />
      {/* <StatusBar style="auto" /> */}

      <Slot />
    </SafeAreaProvider>
  );
};

export default RootLayout;
