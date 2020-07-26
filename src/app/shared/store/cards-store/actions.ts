import { createAction, props } from '@ngrx/store';

import { Card, status } from '@shared/models/card.model';

export const LoadCards = createAction('[Cards] Loading cards');
export const LoadCardsSuccess = createAction('[Cards] Loaded cards successfully', props<{ cards: Card[] }>());

export const UpdateCardDone = createAction('[Cards] updating card status to done',
  props<{ cardId: number, newStatus: status, index?: number }>());

export const UpdateCardToDo = createAction('[Cards] updating card status to todo',
  props<{ cardId: number, newStatus: status, index?: number }>());

export const UpdateCardTodoPosition = createAction('[Cards] updating todo card position',
  props<{ cardId: number, newStatus: status, index?: number }>());

export const UpdateCardDonePosition = createAction('[Cards] updating done card position',
  props<{ cardId: number, newStatus: status, index?: number }>());

export const SearchCardsByName = createAction('[Cards] Searching cards by name', props<{ name: string }>());

export const SetSearchWord = createAction('[Cards] Set current search word', props<{ name: string }>());

export const SetCardExpanded = createAction('[Cards] Set expanded state', props<{ cardId: number, statusRef: status, expanded: boolean }>());
