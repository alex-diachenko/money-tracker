import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-transactions-filter-modal',
  imports: [ MatSelectModule, MatDatepickerModule, MatDialogModule, MatButtonModule],
  providers: [provideNativeDateAdapter()],

  templateUrl: './transactions-filter-modal.component.html',
  styleUrl: './transactions-filter-modal.component.scss'
})
export class TransactionsFilterModalComponent {
  readonly dialogRef = inject(MatDialogRef<TransactionsFilterModalComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  categories = [
    { value: '', title: '' }
  ];

  types = [
    { value: 'income', title: 'Income' },
    { value: 'outcome', title: 'Outcome' }
  ]

  discard() {
    this.dialogRef.close();
  }

  apply() {
    this.dialogRef.close();

  }
}
