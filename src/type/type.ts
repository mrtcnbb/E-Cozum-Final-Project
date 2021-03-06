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

export interface LabelFromList {
  id: number;
  title: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChecklistItem {
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
  items: ChecklistItem[];
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

export interface UserList {
  users: User[];
}

export interface User {
  id: number;
  username: string;
  createdAt: Date;
  updatedAt: Date;
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

export interface BoardFromList {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: number;
  members: any[];
}

export interface BoardFromPost {
  id: number;
  title: string;
  ownerId: number;
  updatedAt: Date;
  createdAt: Date;
}
