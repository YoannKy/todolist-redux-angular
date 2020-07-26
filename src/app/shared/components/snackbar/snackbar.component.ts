import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
})
export class SnackbarComponent implements OnInit {
  message: string;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: string,
  ) {}

  ngOnInit() {
    this.message = this.data;
  }
}
