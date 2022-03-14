import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { connectToDefaultRoom, RoomsState } from "../room/roomsSlice";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const rooms = useSelector<{rooms: RoomsState}>(state => state.rooms);
  console.log(rooms);

  useEffect(() => {
    dispatch(connectToDefaultRoom());
  }, [])

  return (
    <View style={styles.container}>
      <Text>Example 2!</Text>
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
