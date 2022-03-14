import React, { useState } from "react";
import { Button, TextInput, View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { addMessage } from "./roomsSlice";

export default function MessageInputBox() {
  const dispatch = useDispatch();
  const [messageText, setMessageText] = useState<string>("");

  const sendMessage = () => {
    dispatch(addMessage([{ type: "text", value: messageText }]));
    setMessageText('');
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.textInputWrapper}>
        <TextInput
          value={messageText}
          onChangeText={setMessageText}
          style={styles.textInput}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button title="Send" onPress={sendMessage}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: 'space-between',
    backgroundColor: "#ccc",
  },
  textInputWrapper: {
    flex: 1,
    padding: 8
  },
  textInput: {
    flex: 1,
    padding: 8,
  },
  buttonWrapper: {
    margin: 8,
    width: 64,
    height: 32,
  },
});
