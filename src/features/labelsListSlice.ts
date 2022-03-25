import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import authRequest from '../service/authRequest';
import { LabelFromList } from '../type/type';

interface LabelsListState {
  data: LabelFromList[] | null;
  loading: boolean;
  error: string;
}

const initialState: LabelsListState = {
  data: null,
  loading: false,
  error: '',
};

export const fetchLabels = createAsyncThunk('fetchLabels', async () => {
  const response = await authRequest().get('label');
  return response.data;
});

const labelsList = createSlice({
  name: 'labelsList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLabels.pending, (state, action) => {
      state.loading = true;
      state.error = '';
      state.data = null;
    });
    builder.addCase(fetchLabels.fulfilled, (state, action: PayloadAction<LabelFromList[]>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = '';
    });
    builder.addCase(fetchLabels.rejected, (state, action) => {
      state.loading = false;
      state.error = "Couldn't fetch labels";
      state.data = null;
    });
  },
});

export default labelsList.reducer;
