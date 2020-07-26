import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, iif } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

import { Card, status } from '@shared/models/card.model';
import { CardsState } from '@shared/store/cards-store/state';
import {
  CardsStoreSelectors,
  CardsStoreActions
 } from '@shared/store/cards-store';

export const getSearchCardsByStatus = {
  [status.done]: CardsStoreSelectors.getSearchDoneCards,
  [status.pending]: CardsStoreSelectors.getSearchPendingCards,
  [status.rejected]: CardsStoreSelectors.getSearchRejectedCards,
};

export const getActionByStatus = {
  [status.done]: CardsStoreActions.UpdateCardDone,
  [status.rejected]: CardsStoreActions.UpdateCardToDo,
  [status.pending]: CardsStoreActions.UpdateCardToDo,
};

export const getActionByStatusForPosition = {
  [status.done]: CardsStoreActions.UpdateCardDonePosition,
  [status.rejected]: CardsStoreActions.UpdateCardTodoPosition,
  [status.pending]: CardsStoreActions.UpdateCardTodoPosition,
};

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(
    private store: Store<CardsState>,
  ) {}

  getCards(filteredStatuses: status[]): Observable<Card[]> {
    const getAllCards$ = (
      filteredStatuses.includes(status.done) ?
      this.store.pipe(select(CardsStoreSelectors.getDone)) :
      this.store.pipe(select(CardsStoreSelectors.getToDo))
    );

    const getSearchCards$ = combineLatest(
      filteredStatuses.map(filteredStatus => this.store.pipe(getSearchCardsByStatus[filteredStatus])),
    ).pipe(
      map((cardsByStatus: Card[][]) => cardsByStatus.reduce((acc, statuses) => [...acc, ...statuses])),
    );

    return combineLatest(
      this.store.pipe(select(CardsStoreSelectors.getSearch)),
      this.store.pipe(select(CardsStoreSelectors.getSearchWord)),
    ).pipe(
      switchMap(([searchResults, searchWord]) =>
        iif(
          () => searchResults === null || !searchWord.length,
          getAllCards$,
          getSearchCards$,
        ),
      ),
    );
  }

  get searchWord$(): Observable<string> {
    return this.store.pipe(select(CardsStoreSelectors.getSearchWord));
  }

  get isLoading$(): Observable<boolean> {
    return this.store.pipe(select(CardsStoreSelectors.getIsLoading));
  }

  updateStatus(card: Card, index: number = 0, sameContainer = false): void {
    const newStatus = sameContainer ? card.status : this.getNewStatus(card);
    const updateAction = sameContainer ? getActionByStatusForPosition[newStatus] : getActionByStatus[newStatus];
    this.store.dispatch(updateAction({ cardId: card.id, newStatus, index }));
  }

  updateAllStatus(cards: Card[]): void {
    [...cards].reverse().forEach(card => this.updateStatus(card));
  }

  setAllExpanded(cards: Card[],  expanded: boolean): void {
    cards.forEach(card => this.setExpanded(card, expanded));
  }

  setExpanded(card: Card, expanded: boolean) {
    this.store.dispatch(CardsStoreActions.SetCardExpanded({ cardId: card.id, statusRef: card.status, expanded }));
  }

  private getNewStatus(card: Card): status {
    return [status.pending, status.rejected].includes(card.status) ? status.done : status.rejected;
  }
}
