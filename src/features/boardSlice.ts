import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import authRequest from '../service/authRequest';

interface boardState {
  data: BoardFromId | null;
  loading: boolean;
  error: string;
}

const initialState: boardState = {
  data: null,
  loading: false,
  error: '',
};

export const fetchBoard = createAsyncThunk('fetchBoard', async (id: string) => {
  const response = await authRequest().get<BoardFromId>(`board/${id}`);
  return response.data;
});

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.pending, (state, action) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(fetchBoard.fulfilled, (state, action: PayloadAction<BoardFromId>) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchBoard.rejected, (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = "Couldn't fetch board!";
    });
  },
});

export default boardSlice.reducer;

export interface CardLabel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  cardId: number;
  labelId: number;
}

export interface Label {
  id: number;
  title: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  CardLabel: CardLabel;
}

export interface Item {
  id: number;
  title: string;
  isChecked: boolean;
  createdAt: Date;
  updatedAt: Date;
  checklistId: number;
}

export interface Checklist {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  cardId: number;
  items: Item[];
}

export interface Author {
  id: number;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: number;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  cardId: number;
  authorId: number;
  author: Author;
}

export interface Card {
  id: number;
  title: string;
  description?: any;
  order?: any;
  duedate?: any;
  createdAt: Date;
  updatedAt: Date;
  listId: number;
  labels: Label[];
  checklists: Checklist[];
  comments: Comment[];
}

export interface List {
  id: number;
  order?: any;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  boardId: number;
  cards: Card[];
}

export interface Owner {
  id: number;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BoardMember {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  boardId: number;
  userId: number;
}

export interface Member {
  id: number;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  BoardMember: BoardMember;
}

export interface TitleUpdatedBoard {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: number;
}

export interface BoardFromId {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: number;
  lists: List[];
  owner: Owner;
  members: Member[];
}
