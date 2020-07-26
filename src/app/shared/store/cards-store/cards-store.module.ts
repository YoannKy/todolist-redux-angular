import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { cardsReducer } from './reducer';
import { CardsStoreEffects } from './effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('cards', cardsReducer),
    EffectsModule.forFeature([CardsStoreEffects]),
  ],
})
export class CardsStoreModule {}
