import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AUTH_FIELDS } from "../../constants/auth";
import { UserKeysType } from "../../types/auth";

interface UsersState {
  id: string;
  email: string;
  accessToken: string;
}

const initialState: UsersState = {
  id: "",
  email: "",
  accessToken: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserKeysType>) => {
      const { id, email, accessToken } = action.payload;
      state.id = id;
      state.email = email;
      state.accessToken = accessToken;
    },
    deleteUser: (state) => {
      state.id = "";
      state.email = "";
    },
    updateUser: (
      state,
      action: PayloadAction<{
        property: AUTH_FIELDS;
        value: string;
      }>
    ) => {
      const { property, value } = action.payload;
      state[property] = value;
    },
  },
});

export const { setUser, deleteUser, updateUser } = usersSlice.actions;

export default usersSlice.reducer;
