import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  tap,
  flatMap,
  map,
  filter,
  withLatestFrom,
} from 'rxjs/operators';

import { Card } from '@shared/models/card.model';
import { SnackbarComponent } from '@shared/components/snackbar/snackbar.component';
import { CardApiService } from '@shared/api/card.api.service';

import * as cardsActions from './actions';
import { getSearchWord } from './selectors';
import { CardsState } from './state';

@Injectable()
export class CardsStoreEffects {
  constructor(
    private cardApiService: CardApiService,
    private actions: Actions,
    private store: Store<CardsState>,
    private matSnackBar: MatSnackBar,
  ) {}

  updateTodoCardSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(cardsActions.UpdateCardToDo),
      tap(() => {
        this.matSnackBar.openFromComponent(SnackbarComponent, {
          data: ['updated card to todo successfully'],
        });
      }),
      withLatestFrom(this.store.pipe(select(getSearchWord))),
      filter(([_, name]) => !!name.length),
      map(([_, name]) => cardsActions.SearchCardsByName({ name })),
    ),
  );

  updateDoneCardSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(cardsActions.UpdateCardDone),
      tap(() => {
        this.matSnackBar.openFromComponent(SnackbarComponent, {
          data: ['updated card to done successfully'],
        });
      }),
      withLatestFrom(this.store.pipe(select(getSearchWord))),
      filter(([_, name]) => !!name.length),
      map(([_, name]) => cardsActions.SearchCardsByName({ name })),
    ),
  );

  updateCardPositionSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(cardsActions.UpdateCardTodoPosition, cardsActions.UpdateCardDonePosition),
      tap(() => {
        this.matSnackBar.openFromComponent(SnackbarComponent, {
          data: ['updated card position successfully'],
        });
      }),
      withLatestFrom(this.store.pipe(select(getSearchWord))),
      filter(([_, name]) => !!name.length),
      map(([_, name]) => cardsActions.SearchCardsByName({ name })),
    ),
  );

  loadCardsSuccessfully$ = createEffect(() =>
    this.actions.pipe(
      ofType(cardsActions.LoadCardsSuccess),
      tap(() => {
        this.matSnackBar.openFromComponent(SnackbarComponent, {
          data: ['loaded cards successfully'],
        });
      }),
    ), { dispatch: false },
  );

  loadCards$ = createEffect(() =>
    this.actions.pipe(
      ofType(cardsActions.LoadCards),
      flatMap(() => this.cardApiService.cards),
      map((cards: Card[]) => cardsActions.LoadCardsSuccess({ cards })),
    ),
  );
}
