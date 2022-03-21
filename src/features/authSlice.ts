import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authSliceProps {
  isLogged: boolean;
}

const initialState: authSliceProps = {
  isLogged: false,
};

const authSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    setIsLogged: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLogged: action.payload,
    }),
  },
});

export default authSlice.reducer;
export const { setIsLogged } = authSlice.actions;
