import Room, { MessageLoader } from "../data/Room";
import { RoomRepository } from "../data/RoomRepository";
import firestore from "@react-native-firebase/firestore";
import { Message } from "../data/Message";

class FirebaseMessageLoader implements MessageLoader {
  roomName: string;
  constructor(roomName: string) {
    this.roomName = roomName    
  }
  async load(): Promise<Message[]> {
    const snap = await firestore().collection("rooms").doc(this.roomName).collection("messages").get();
    const docs = snap.docs;
    console.log('loaded messages', docs);
    return docs.map(doc => {
      const data = doc.data();
      return {
        id: data.id,
        content: data.content,
        user: data.user,
      }
    });
  }

}

export class FirebaseRoomRepository implements RoomRepository {

  async subscribeToRoom(roomName: string, cb: (room: Room) => void) {
    try {
      const subscriber = firestore()
        .collection("rooms")
        .doc(roomName)
        .onSnapshot((documentSnapshot) => {
          const data = documentSnapshot.data();
          const room: Room = {
            id: roomName,
            name: data?.name || "Default",
            messageLoader: new FirebaseMessageLoader(roomName)
          };
          cb(room)
        });
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
