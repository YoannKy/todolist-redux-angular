import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HighlightPipe } from './pipes/highlight.pipe';
import { RootStoreModule } from './store/root.module';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  exports: [
    RootStoreModule,
    SnackbarComponent,
    MaterialModule,
    FlexLayoutModule,
    HighlightPipe,
  ],
  declarations: [
    SnackbarComponent,
    HighlightPipe,
  ],
})
export class SharedModule {}
