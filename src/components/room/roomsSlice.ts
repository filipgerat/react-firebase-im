import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Message } from "../../data/Message";
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
>("rooms/connectToDefaultRoom", async (_, { extra }) => {
  const subscriber = await extra.appContext.roomRepository.subscribeToRoom(
    "default",
    (room: any) => {
      console.log("From subscribtion", room);
    }
  );
  console.log("subscriber", subscriber);
  return subscriber;
});

export const addMessage = createAsyncThunk<
  void,
  Message,
  { extra: { appContext: any } }
>("rooms/addMessage", async (message: Message, { getState, extra }) => {
  const state = (getState() as { rooms: RoomsState });
  console.log("IN THUNK", state);
  const room = state.rooms.active;
  if (!room) {
    console.log("No active room", state);
    return;
  }
  const result = await extra.appContext.roomRepository.addMessage(room, message);
  return;
});

export const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
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

export default roomsSlice.reducer;
