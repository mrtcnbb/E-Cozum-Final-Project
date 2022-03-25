import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import authSlice from '../features/authSlice';
import boardSlice from '../features/boardSlice';
import boardsListSlice from '../features/boardsListSlice';
import labelsListSlice from '../features/labelsListSlice';
import triggerSlice from '../features/triggerSlice';

const store = configureStore({
  reducer: {
    authState: authSlice,
    boardsList: boardsListSlice,
    boardState: boardSlice,
    triggerState: triggerSlice,
    labelsList: labelsListSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
