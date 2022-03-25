import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface triggerState {
  isTriggered: boolean;
}

const initialState: triggerState = {
  isTriggered: false,
};

const triggerSlice = createSlice({
  name: 'triggerState',
  initialState,
  reducers: {
    setIsTriggered: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isTriggered: action.payload,
    }),
  },
});

export default triggerSlice.reducer;
export const { setIsTriggered } = triggerSlice.actions;
