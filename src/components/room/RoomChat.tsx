import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MessageInputBox from "./MessageInputBox";

export default function RoomChat() {
  return (
    <View style={styles.container}>
      <Text>Example 2!</Text>
      <MessageInputBox />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignSelf: "stretch"
  },
});
