import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import uuid from "react-native-uuid";
import { Message, MessageContentBlocks } from "../../data/Message";
import Room from "../../data/Room";
import { UserState } from "../user/userSlice";

const roomsAdapter = createEntityAdapter<Room>();

export interface RoomsState {
  active: Room | null;
  roomSubscriber: (() => void) | null;
  messageSubscriber: (() => void) | null;
  error: string | null;
  messages: Message[];
}

const initialState: RoomsState = roomsAdapter.getInitialState({
  active: null,
  roomSubscriber: null,
  messageSubscriber: null,
  error: null,
  messages: [],
});

export const connectToDefaultRoom = createAsyncThunk<
  () => any,
  undefined,
  { extra: { appContext: any } }
>("rooms/connectToDefaultRoom", async (_, { dispatch, extra }) => {
  const subscriber = await extra.appContext.roomRepository.subscribeToRoom(
    "default",
    (room: Room) => {
      dispatch(setActiveRoom(room));
      dispatch(subscribeToMessages(room));
    }
  );
  console.log("subscriber", subscriber);
  return subscriber;
});

export const subscribeToMessages = createAsyncThunk<
  () => void,
  Room,
  { extra: { appContext: any } }
>("rooms/subscribeToMessages", async (room, { dispatch, getState }) => {
  const subscriber = await room.messageLoader.subscribe((messages) => {
    dispatch(setMessages(messages))
  });
  return subscriber;
});

export const loadMessages = createAsyncThunk<
  Message[],
  undefined,
  { extra: { appContext: any } }
>("rooms/loadMessages", async (_, { getState, extra }) => {
  const state = getState() as { rooms: RoomsState };
  const room = state.rooms.active;
  if (!room) {
    console.warn("loadMessages: No active room", state);
    return [];
  }
  const messages = await room.messageLoader.load();
  return messages;
});

export const addMessage = createAsyncThunk<
  void,
  MessageContentBlocks,
  { extra: { appContext: any } }
>(
  "rooms/addMessage",
  async (messageContent: MessageContentBlocks, { getState, extra }) => {
    const state = getState() as { user: UserState, rooms: RoomsState };
    const room = state.rooms.active;
    if (!room) {
      console.warn("addMessage: No active room", state);
      return;
    }
    const message: Message = {
      id: uuid.v4().toString(),
      user: state.user.user?.email || "",
      content: messageContent,
      createdAt: new Date(),
    };
    const result = await extra.appContext.roomRepository.addMessage(
      room,
      message
    );
    return;
  }
);

export const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setActiveRoom(state, action: PayloadAction<Room>) {
      console.debug("Setting active room", action.payload);
      state.active = action.payload;
    },
    setMessages(state, action: PayloadAction<Message[]>) {
      console.debug("Setting messages", action.payload);
      state.messages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      connectToDefaultRoom.fulfilled,
      (state, action: PayloadAction<() => any>) => {
        state.roomSubscriber = action.payload;
      }
    );
    builder.addCase(
      addMessage.fulfilled,
      (state, action: PayloadAction<void>) => {
        console.log("In reducer after message");
      }
    );
    builder.addCase(
      loadMessages.fulfilled,
      (state, action: PayloadAction<Message[]>) => {
        state.messages = action.payload;
      }
    );
    builder.addCase(
      subscribeToMessages.fulfilled,
      (state, action: PayloadAction<() => void>) => {
        state.messageSubscriber = action.payload;
      }
    );
  },
});

export const { setActiveRoom, setMessages } = roomsSlice.actions;

export default roomsSlice.reducer;

export const selectMessages = (state: { rooms: RoomsState }) =>
  state.rooms.messages;
