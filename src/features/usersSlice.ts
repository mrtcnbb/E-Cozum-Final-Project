import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import authRequest from '../service/authRequest';
import { UserList } from '../type/type';

interface userListState {
  data: UserList | null;
  loading: boolean;
  error: string;
}

const initialState: userListState = {
  data: null,
  loading: false,
  error: '',
};

export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
  const response = await authRequest().get<UserList>('user');
  return response.data;
});

const usersListSlice = createSlice({
  name: 'usersList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.loading = true;
      state.error = '';
      state.data = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UserList>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = '';
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = "Couldn't fetch users";
      state.data = null;
    });
  },
});

export default usersListSlice.reducer;
