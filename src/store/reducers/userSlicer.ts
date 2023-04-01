import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Repository = {
  repository_name: string;
  description: string | null;
  rating?: number;
};

export type User = {
  [name: string]: Repository[];
};

interface UserState {
  isLoading: boolean;
  error?: string | null;
  users: User;
}

const initialState: UserState = {
  isLoading: false,
  error: null,
  users: {}
};

export const userSlicer = createSlice({
  name: "username",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User>) => {
      state.users = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setIsLoading: (state) => {
      state.isLoading = !state.isLoading;
    }
  }
});

export const { setUsers, setError, setIsLoading } = userSlicer.actions;

export default userSlicer.reducer;
