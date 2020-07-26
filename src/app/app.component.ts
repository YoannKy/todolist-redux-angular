import { Component, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { Store } from '@ngrx/store';

import { Card, status } from '@shared/models/card.model';
import { CardsStoreActions, CardsStoreState } from '@shared/store/cards-store';

import { CardService } from './card/card.service';

export interface CdkDragDropHTMLElement<T> extends HTMLElement {
  data: T;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  toDoStatus: status[] = [status.pending, status.rejected];
  doneStatus: status[] = [status.done];

  constructor(
    private store: Store<CardsStoreState.CardsState>,
    private cardService: CardService,
  ) {}

  ngOnInit() {
    this.store.dispatch(CardsStoreActions.LoadCards());
  }

  drop(event: CdkDragDrop<Card[]>): void {
    const card = (event.item.element.nativeElement as CdkDragDropHTMLElement<Card>).data;
    if (event.currentIndex !== event.previousIndex || event.container !== event.previousContainer) {
      this.cardService.updateStatus(card, event.currentIndex, event.container === event.previousContainer);
    }
  }
}
