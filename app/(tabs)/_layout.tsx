import { Tabs } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#1E90FF',
      tabBarInactiveTintColor: 'gray'
      }}>
      <Tabs.Screen name="home" options={{ 
          headerShown: false, 
          title: "Home", 
          tabBarIcon:({color, size})=>(
            <AntDesign name="home" size={24} color={color} />
          )
          }}/>
      <Tabs.Screen name="cadastrarEvent" options={{ 
          headerShown: false,   
          title: "Criar Evento",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="plus" size={24} color={color}  />
          )
      }}/>
      <Tabs.Screen name="editUser" options={{ 
          headerShown: false,   
          title: "Criar Evento",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={24} color={color} />
          )
      }}/>
    </Tabs>
  );
}
