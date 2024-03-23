import { View, Text, SafeAreaView, StyleSheet, Pressable } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

export default function Facilites({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>This is the Home screen</Text>
      <View>
        <Pressable onPress={() => navigation.navigate("Invent")}>
          <Text>Go to inventory </Text>
        </Pressable>
      </View>

      <View>
        <Pressable
          onPress={() => navigation.navigate('Schedul')}
        >
          <Text>Go to Schedule </Text>
        </Pressable>
      </View>
    </View>
  );
}
