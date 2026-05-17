import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTeam: null, // e.g., 'CSK', 'RCB'
  user: {
    id: 'user_' + Math.random().toString(36).substr(2, 9),
    name: 'Cricket Fan ' + Math.floor(Math.random() * 1000),
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + Math.random(),
    points: 0,
  },
  soundEnabled: true,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTeam: (state, action) => {
      state.selectedTeam = action.payload;
    },
    addPoints: (state, action) => {
      state.user.points += action.payload;
    },
    toggleSound: (state) => {
      state.soundEnabled = !state.soundEnabled;
    }
  },
});

export const { setTeam, addPoints, toggleSound } = appSlice.actions;
export default appSlice.reducer;
