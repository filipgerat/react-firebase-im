import React from "react";
import { View, StyleSheet } from "react-native";
import MessageDisplay from "./MessageDisplay";
import MessageInputBox from "./MessageInputBox";

export default function RoomChat() {
  return (
    <View style={styles.container}>
      <MessageDisplay />
      <MessageInputBox />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
  },
});
