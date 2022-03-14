import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../../constants";
import User from "../../data/User";

export interface UserState {
  status: Status;
  user: User | null;
  userSubscriber: (() => void) | null;
}

const initialState: UserState = {
  status: 'idle',
  user: null,
  userSubscriber: null,
};

export const listenToAuthChanges = createAsyncThunk<
  () => any,
  undefined,
  { extra: { appContext: any } }
>("rooms/listenToAuthChanges", async (_, { dispatch, extra }) => {
  const subscriber = await extra.appContext.userRepository.onAuthStateChanged(
    (user: User | null) => {
      dispatch(setUser(user));
    }
  );
  const currentUser = await extra.appContext.userRepository.getCurrentUser();
  dispatch(setUser(currentUser))
  console.log("subscriber", subscriber, currentUser);
  return subscriber;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      console.debug("Setting auth user", action.payload);
      state.user = action.payload;
      state.status = 'success';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      listenToAuthChanges.fulfilled,
      (state, action: PayloadAction<(() => void) | null>) => {
        state.userSubscriber = action.payload;
      }
    );
    builder.addCase(
      listenToAuthChanges.pending,
      (state) => {
        state.status = 'loading';
      }
    );
  },
});

export default userSlice.reducer;

export const { setUser } = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectUserStatus = (state: { user: UserState }) => state.user.status;
