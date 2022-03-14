import { Message } from "./Message";

export interface MessageLoader {
  load: () => Promise<Message[]>
}
export interface Room {
  id: string;
  name: string;
  messageLoader: MessageLoader;
}

export default Room;