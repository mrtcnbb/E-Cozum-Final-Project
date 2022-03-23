import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import authSlice from '../features/authSlice';
import boardSlice from '../features/boardSlice';
import boardsListSlice from '../features/boardsListSlice';
import listSlice from '../features/listSlice';

const store = configureStore({
  reducer: {
    authState: authSlice,
    boardsList: boardsListSlice,
    boardState: boardSlice,
    listState: listSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
