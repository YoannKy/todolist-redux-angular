import { Card } from '@shared/models/card.model';

export interface CardsState {
  toDo: Card[];
  cards: Card[];
  done: Card[];
  isLoading: boolean;
  search: Card[];
  searchedWord: string;
}

export const initialState: CardsState = {
  toDo: [],
  done: [],
  cards: [],
  isLoading: true,
  search: null,
  searchedWord: '',
};
