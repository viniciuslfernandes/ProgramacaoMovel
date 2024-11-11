import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ headerShown: false, title: "Home" }}/>
      <Tabs.Screen name="cadastrarEvent" options={{ headerShown: false, title: "Criar Evento" }}/>
    </Tabs>
  );
}
