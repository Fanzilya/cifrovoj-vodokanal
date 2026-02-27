import "@/global.css";
import { AuthProvider } from "@/packages/entities/user/context";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <AuthProvider>
            <Slot />
        </AuthProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};