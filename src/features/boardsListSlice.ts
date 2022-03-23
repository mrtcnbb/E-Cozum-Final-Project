import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import authRequest from '../service/authRequest';
import { BoardFromList, BoardFromPost } from '../type/type';

interface boardsListState {
  data: BoardFromList[] | null;
  postBoardData: number | null;
  loading: boolean;
  error: string;
}

const initialState: boardsListState = {
  data: null,
  postBoardData: null,
  loading: false,
  error: '',
};

export const fetchBoards = createAsyncThunk('fetchBoards', async () => {
  const response = await authRequest().get<BoardFromList[]>(`board`);
  return response.data;
});

export const createBoard = createAsyncThunk('createBoard', async () => {
  const response = await authRequest().post<BoardFromPost>(`board`, { title: 'Untitled Board' });
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
      state.error = "Couldn't fetch boards";
      state.data = null;
    });
    builder.addCase(createBoard.fulfilled, (state, action: PayloadAction<BoardFromPost>) => {
      state.postBoardData = action.payload.id;
      fetchBoards();
    });
  },
});

export default boardsListSlice.reducer;
export const { resetState } = boardsListSlice.actions;
