import { Stack } from "expo-router";
import axios from "axios";
import { SessionProvider } from "@/auth/authProvider";
import { useAuth } from "@/auth/authProvider";

export default function RootLayout() {
  return (
    <SessionProvider>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SessionProvider>
  );
}
