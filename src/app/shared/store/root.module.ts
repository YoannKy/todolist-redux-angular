import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CardsStoreModule } from './cards-store/cards-store.module';

@NgModule({
  imports: [
    CommonModule,
    CardsStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  declarations: [],
})
export class RootStoreModule {}
