import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserKeysType } from "../../types/auth";

interface UsersState {
  accessToken: string;
}

const initialState: UsersState = {
  accessToken: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserKeysType>) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
    },
    deleteUser: (state) => {
      state.accessToken = "";
    },
  },
});

export const { setUser, deleteUser } = usersSlice.actions;

export default usersSlice.reducer;
