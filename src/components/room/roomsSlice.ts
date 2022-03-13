import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import Room from "../../data/Room";

const roomsAdapter = createEntityAdapter<Room>();

interface RoomsState {
  active: Room | null;
  error: string | null;
}

const initialState: RoomsState = roomsAdapter.getInitialState({
  active: null,
  error: null,
});

export const connectToDefaultRoom = createAsyncThunk<
  Room | null,
  RoomsState,
  { extra: { appContext: any } }
>("rooms/connectToDefaultRoom", async (_, { extra }) => {
  const room = await extra.appContext.connectToDefaultRoom();
  return room;
});

export const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      connectToDefaultRoom.fulfilled,
      (state, action: PayloadAction<Room | null>) => {
        state.active = action.payload;
      }
    );
  },
});

export default roomsSlice.reducer;
