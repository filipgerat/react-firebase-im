import { Button, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { addMessage, connectToDefaultRoom, RoomsState } from "../room/roomsSlice";
import { useDispatch, useSelector } from "react-redux";
import RoomChat from "../room/RoomChat";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const rooms = useSelector<{rooms: RoomsState}>(state => state.rooms);
  console.debug("ROOMS STATE", rooms);

  useEffect(() => {
    dispatch(connectToDefaultRoom());
  }, [])


  return (
    <View style={styles.container}>
      <RoomChat/>
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
