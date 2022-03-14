import { Message } from "./Message";
import Room from "./Room";

export interface RoomRepository {
  subscribeToRoom: (roomName: string, cb: (room: Room) => void) => Promise<() => any>;
  addMessage: (room: Room, message: Message) => Promise<void>;
}
