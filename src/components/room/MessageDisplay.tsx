import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";

import { Message } from "../../data/Message";
import { selectMessages } from "./roomsSlice";

export default function MessageDisplay() {
  const messages = useSelector(selectMessages);

  const renderMessage = (message: Message) => {
    return (
      <View key={message.id} style={styles.messageBox}>
        {message.content.map((c, index) => (
          <Text key={index} style={styles.messageText}>{c.value}</Text>
        ))}
        <Text style={styles.messageUserText}>{message.user}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={{ flex: 1, flexDirection: "column" }}>
      {messages.map((m) => renderMessage(m))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  messageBox: {
    padding: 8,
    margin: 8,
    marginBottom: 0,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  messageText: {
    color: '#fff'
  },
  messageUserText: {
    color: '#999'
  }
});
