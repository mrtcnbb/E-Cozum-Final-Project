import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getCookie from '../getToken';

interface authState {
  isLogged: boolean;
}

const initialState: authState = {
  isLogged: getCookie('token') ? true : false,
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
