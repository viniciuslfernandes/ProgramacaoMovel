import { Text, View } from "react-native";
import { Link } from "expo-router";
export default function CreateLogin() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Create Login</Text>
      {/* <Link href="(auth)">Voltar para login</Link> */}
    </View>
  );
}
