import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { MatAccordion } from '@angular/material/expansion';

import { Card, status } from '@shared/models/card.model';

import { CardService } from '../card.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ListComponent implements OnInit {
  @Input() title: string;
  @Input() statuses: status[];

  @ViewChild(MatAccordion) accordion: MatAccordion;

  cards$: Observable<Card[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private cardService: CardService,
  ) {}

  ngOnInit(): void {
    this.cards$ = this.cardService.getCards(this.statuses);

    this.isLoading$ = this.cardService.isLoading$;
  }

  moveAll(cards: Card[]): void {
    this.cardService.updateAllStatus(cards);
  }

  openAll(cards: Card[]): void {
    this.accordion.openAll();
    this.cardService.setAllExpanded(cards, true);
  }

  closeAll(cards: Card[]): void {
    this.accordion.closeAll();
    this.cardService.setAllExpanded(cards, false);
  }
}
