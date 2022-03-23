import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import getCookie from '../getToken';
import authRequest from '../service/authRequest';
import { baseURL } from '../service/baseURL';
import { BoardFromList } from '../type/type';

interface boardsListState {
  data: BoardFromList[] | null;
  loading: boolean;
  error: string;
}

const initialState: boardsListState = {
  data: null,
  loading: false,
  error: '',
};

export const fetchBoards = createAsyncThunk('fetchBoards', async () => {
  const response = await authRequest().get<BoardFromList[]>(`board`);
  return response.data;
});

// create board a bak
export const createBoard = createAsyncThunk('fetchBoards', async () => {
  const response = await authRequest().post<any>(`board`, { title: 'Untitled Board' });
  return response.data;
});

const boardsListSlice = createSlice({
  name: 'boardsList',
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = '';
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.pending, (state, action) => {
      state.loading = true;
      state.error = '';
      state.data = null;
    });
    builder.addCase(fetchBoards.fulfilled, (state, action: PayloadAction<BoardFromList[]>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = '';
    });
    builder.addCase(fetchBoards.rejected, (state, action) => {
      state.loading = false;
      state.error = "Couldn't fetch users";
      state.data = null;
    });
  },
});

export default boardsListSlice.reducer;
export const { resetState } = boardsListSlice.actions;
