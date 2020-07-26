import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { tap, debounceTime, takeUntil } from 'rxjs/operators';

import { CardsState } from '@shared/store/cards-store/state';
import { SearchCardsByName, SetSearchWord } from '@shared/store/cards-store/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  formControl = new FormControl();
  destroy$ = new Subject<boolean>();

  constructor(private store: Store<CardsState>) {}

  ngOnInit(): void {
    this.formControl.valueChanges.pipe(
      debounceTime(400),
      tap(name => this.store.dispatch(SearchCardsByName({ name }))),
      tap(name => this.store.dispatch(SetSearchWord({ name }))),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
