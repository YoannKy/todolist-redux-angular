import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

import { Card, status } from '@shared/models/card.model';

import { CardsState } from './state';

export const selectCardsState = createFeatureSelector<CardsState>(
  'cards',
);

const selectTodo = (cardState: CardsState) => cardState.toDo;
const selectDone = (cardState: CardsState) => cardState.done;
const selectIsLoading = (cardState: CardsState) => cardState.isLoading;
const selectSearch = (cardState: CardsState) => cardState.search;
const selectSearchWord = (cardState: CardsState) => cardState.searchedWord;

export const getToDo = createSelector(
  selectCardsState,
  selectTodo,
);

export const getDone = createSelector(
  selectCardsState,
  selectDone,
);

export const getIsLoading = createSelector(
  selectCardsState,
  selectIsLoading,
);

export const getSearch = createSelector(
  selectCardsState,
  selectSearch,
);

export const getSearchWord = createSelector(
  selectCardsState,
  selectSearchWord,
);

export const getSearchPendingCards = pipe(
  select(getSearch),
  map((cards: Card[]) => cards.filter(card =>
    card.status === status.pending)),
);

export const getSearchRejectedCards = pipe(
  select(getSearch),
  map((cards: Card[]) => cards.filter(card =>
    card.status === status.rejected)),
);

export const getSearchDoneCards = pipe(
  select(getSearch),
  map((cards: Card[]) => cards.filter(card =>
    card.status === status.done)),
);
