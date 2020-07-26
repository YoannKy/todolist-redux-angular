import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Card, status } from '@shared/models/card.model';

import { CardService } from '../card.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.less'],
})
export class ItemComponent implements OnInit {
  @Input() card: Card;

  searchWord$: Observable<string>;
  iconByStatus = {
    [status.done]: 'done_outline',
    [status.pending]: 'pending',
    [status.rejected]: 'error_outline',
  };
  colorByStatus = {
    [status.done]: 'green',
    [status.pending]: 'gray',
    [status.rejected]: 'red',
  };

  constructor(
    private cardService: CardService,
  ) {}

  ngOnInit(): void {
    this.searchWord$ = this.cardService.searchWord$;
  }

  move(card: Card): void {
    this.cardService.updateStatus(card);
  }

  setExpanded(expanded: boolean) {
    this.cardService.setExpanded(this.card, expanded);
  }
}
