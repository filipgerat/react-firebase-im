import Room from "../data/Room";
import { RoomRepository } from "../data/RoomRepository";
import firestore from "@react-native-firebase/firestore";
import { Message } from "../data/Message";

export class FirebaseRoomRepository implements RoomRepository {
  async getDefault() {
    try {
      const doc = await firestore().collection("rooms").doc("default").get();
      const room = doc.data();
      return {
        id: "default",
        name: room?.name || "Default",
        activeUsers: room?.activeUsers || [],
      };
    } catch (e) {
      console.error(e);
    }
    return null;
  }
  async subscribeToRoom(roomName: string, cb: (room: Room) => void) {
    try {
      const subscriber = firestore()
        .collection("rooms")
        .doc(roomName)
        .onSnapshot((documentSnapshot) => cb(documentSnapshot.data() as Room));
      // Stop listening for updates when no longer required
      return () => subscriber();
    } catch (e) {
      console.error(e);
    }
    return () => {}
  }

  async addMessage(room: Room, message: Message): Promise<void> {
    try {
      const res = await firestore().collection("rooms").doc(room.id).collection('messages').add(message);
      console.log("After firebase add", res)
    } catch (e) {
      console.error(e)
    }
    return;
  }
}

export default FirebaseRoomRepository;
