import { Button, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { addMessage, connectToDefaultRoom, RoomsState } from "../room/roomsSlice";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const rooms = useSelector<{rooms: RoomsState}>(state => state.rooms);
  console.debug("ROOMS STATE", rooms);

  useEffect(() => {
    dispatch(connectToDefaultRoom());
  }, [])

  const sendMessage = () => {
    dispatch(addMessage([{ type: 'text', value: "Example message"}]))
  }

  return (
    <View style={styles.container}>
      <Text>Example 2!</Text>
      <Button title="Send message" onPress={sendMessage}></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
