import { Message } from "./Message";

export interface MessageLoader {
  load: () => Promise<Message[]>,
  subscribe(cb: (messages: Message[]) => void): Promise<() => void>
}
export interface Room {
  id: string;
  name: string;
  messageLoader: MessageLoader;
}

export default Room;