import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="singIn/index" options={{ headerShown: false }}/>
      <Stack.Screen name="createLogin" options={{ headerShown: false }}/>
    </Stack>
  );
}



