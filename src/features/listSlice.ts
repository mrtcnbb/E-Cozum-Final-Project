import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import authRequest from '../service/authRequest';

interface ListState {
  data: any;
  loading: boolean;
  error: string;
}

interface CreateListState {
  title: string;
  boardId: number;
}

const initialState: ListState = {
  data: null,
  loading: false,
  error: '',
};

export const createList = createAsyncThunk('createBoard', async () => {
  const response = await authRequest().post<any>(`list`, {} as CreateListState);
  return response.data;
});

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {},
});

export default listSlice.reducer;
