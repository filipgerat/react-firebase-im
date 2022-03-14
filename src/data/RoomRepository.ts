import { Message } from "./Message";
import Room from "./Room";

export interface RoomRepository {
  getDefault: () => Promise<Room | null>;
  subscribeToRoom: (roomName: string, cb: (room: Room) => void) => Promise<() => any>;
  addMessage: (room: Room, message: Message) => Promise<void>;
}
