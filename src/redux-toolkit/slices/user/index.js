import { createSlice } from "@reduxjs/toolkit";

const userProfileSlice = createSlice({
  name: "user profile",
  initialState: {
    user: {},
  },
  reducers: {
    setUserProfile: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;
