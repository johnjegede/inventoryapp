import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Pressable } from "react-native";

export default function Facilites({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>This is the Home screen</Text>
      <View>
        <Pressable onPress={() => navigation.navigate("Invent")}>
          <Text>Go to inve </Text>
        </Pressable>
      </View>

      <View>
        <Pressable
          onPress={() => navigation.navigate('Schedul')}
        >
          <Text>Go to Sched </Text>
        </Pressable>
      </View>
    </View>
  );
}
