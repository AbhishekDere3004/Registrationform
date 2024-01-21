import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  submittedUsers: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.submittedUsers.push(action.payload);
    },
    setSubmittedUsers: (state, action) => {
      state.submittedUsers = action.payload;
    },
  },
});

export const { addUser, setSubmittedUsers } = userSlice.actions;

export default userSlice.reducer;
