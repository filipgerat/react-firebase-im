import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { addMessage } from "./roomsSlice";

export default function MessageInputBox() {
  const dispatch = useDispatch();
  const [messageText, setMessageText] = useState<string>("");

  const sendMessage = () => {
    dispatch(addMessage([{ type: "text", value: messageText }]));
  };

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <TextInput
        value={messageText}
        onChangeText={setMessageText}
        style={{ padding: 20 }}
      />
      <View style={{ flex: 1 }}>
        <Button title="Send" onPress={sendMessage}></Button>
      </View>
    </View>
  );
}
