import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import uuid from 'react-native-uuid';
import { Message, MessageContentBlocks } from "../../data/Message";
import Room from "../../data/Room";
import { RoomRepository } from "../../data/RoomRepository";

const roomsAdapter = createEntityAdapter<Room>();

export interface RoomsState {
  active: Room | null;
  roomSubscriber: (() => Promise<any>) | null;
  error: string | null;
}

const initialState: RoomsState = roomsAdapter.getInitialState({
  active: null,
  roomSubscriber: null,
  error: null,
});

export const connectToDefaultRoom = createAsyncThunk<
  () => any,
  undefined,
  { extra: { appContext: any } }
>("rooms/connectToDefaultRoom", async (_, { dispatch, extra }) => {
  const subscriber = await extra.appContext.roomRepository.subscribeToRoom(
    "default",
    (room: Room) => {
      dispatch(setActiveRoom(room))      
    }
  );
  console.log("subscriber", subscriber);
  return subscriber;
});

export const addMessage = createAsyncThunk<
  void,
  MessageContentBlocks,
  { extra: { appContext: any } }
>("rooms/addMessage", async (messageContent: MessageContentBlocks, { getState, extra }) => {
  const state = (getState() as { rooms: RoomsState });
  console.log("IN THUNK", state);
  const room = state.rooms.active;
  if (!room) {
    console.log("No active room", state);
    return;
  }
  const message = {
    id: uuid.v4(),
    // TODO: Change this once user is in redux state
    user: 'test',
    content: messageContent
  }
  const result = await extra.appContext.roomRepository.addMessage(room, message);
  return;
});

export const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setActiveRoom(state, action: PayloadAction<Room>) {
      console.debug("Setting active room", action.payload);
      state.active = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      connectToDefaultRoom.fulfilled,
      (state, action: PayloadAction<() => any>) => {
        state.roomSubscriber = action.payload;
      }
    );
    builder.addCase(addMessage.fulfilled, (state, action: PayloadAction<void>) => {
      console.log("In reducer after message")
    });
  },
});

export const {
  setActiveRoom
} = roomsSlice.actions;

export default roomsSlice.reducer;
