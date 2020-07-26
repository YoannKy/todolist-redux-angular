import { Action, createReducer, on } from '@ngrx/store';

import { status } from '@shared/models/card.model';

import { CardsState, initialState } from './state';
import * as cardsAction from './actions';

export const reducer = createReducer(
  initialState,
  on(cardsAction.LoadCards, (state, _) => ({ ...state, isLoading: true })),
  on(cardsAction.LoadCardsSuccess, (state, { cards }) => ({
    ...state,
    cards,
    done: cards.filter((card) => card.status === status.done),
    toDo: cards.filter((card) => [status.pending, status.rejected].includes(card.status)),
    isLoading: false })),
  on(cardsAction.SetSearchWord, (state, { name }) => ({ ...state, searchedWord: name })),
  on(cardsAction.UpdateCardToDo, (state, { cardId, newStatus, index = 0 }) => ({
      ...state,
      toDo: [
            ...state.toDo.slice(0, index),
          { ...state.cards.find(({ id }) => id === cardId), status: newStatus },
        ...state.toDo.slice(index),
      ],
      done: state.done.filter(({ id }) => id !== cardId),
  })),
  on(cardsAction.UpdateCardDone, (state, { cardId, newStatus, index = 0 }) => ({
    ...state,
    done: [
      ...state.done.slice(0, index),
      { ...state.cards.find(({ id }) => id === cardId), status: newStatus },
      ...state.done.slice(index),
    ],
    toDo: state.toDo.filter(({ id }) => id !== cardId),
  })),
  on(cardsAction.UpdateCardTodoPosition, (state, { cardId, newStatus, index = 0 }) => {
    const filteredTodo = state.toDo.filter(card => card.id !== cardId);
    return {
      ...state,
      toDo: [
        ...filteredTodo.slice(0, index),
        { ...state.cards.find(({ id }) => id === cardId), status: newStatus },
        ...filteredTodo.slice(index),
      ],
    };
  }),
  on(cardsAction.UpdateCardDonePosition, (state, { cardId, newStatus, index = 0 }) => {
    const filteredDone = state.done.filter(card => card.id !== cardId);
    return {
      ...state,
      done: [
        ...filteredDone.slice(0, index),
        { ...state.cards.find(({ id }) => id === cardId), status: newStatus },
        ...filteredDone.slice(index),
      ],
    };
  }),
  on(cardsAction.SearchCardsByName, (state, { name }) => ({
    ...state,
    isLoading: false,
    search: [...state.toDo, ...state.done].reduce(
      (acc, card) => {
        if (
          !!name.length &&
          (
            card.patient_name.toLowerCase().includes(name.toLowerCase()) ||
            card.arrhythmias.some(arrhythmia => arrhythmia.toLowerCase().includes(name.toLowerCase()))
          )
        ) {
          return [...acc, {...card, found: true, expanded: true }];
        }

        return acc;
      }, [])}
  )),
  on(cardsAction.SetCardExpanded, (state, { cardId, statusRef, expanded }) => {
    if ([status.pending, status.rejected].includes(statusRef)) {
      return {
        ...state,
        toDo: state.toDo.map(card => card.id === cardId ? {...card, expanded } : card),
        cards: state.cards.map(card => card.id === cardId ? {...card, expanded } : card),
      };
    }

    return {
      ...state,
      done: state.done.map(card => card.id === cardId ? {...card, expanded } : card),
      cards: state.cards.map(card => card.id === cardId ? {...card, expanded } : card),
    };
  }),
);

export const cardsReducer = (state: CardsState, action: Action) => reducer(state, action);
