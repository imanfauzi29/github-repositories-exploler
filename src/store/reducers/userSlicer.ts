import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserDetail = {
  name: string;
  description: string;
  rating: string;
};

type User = {
  [name: string]: UserDetail[];
};

interface UserState {
  users: User;
}

const initialState: UserState = {
  users: {}
};

export const userSlicer = createSlice({
  name: "username",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User>) => {
      state.users = { ...state.users, ...action.payload };
    }
  }
});

export const { setUsers } = userSlicer.actions;

export default userSlicer.reducer;
