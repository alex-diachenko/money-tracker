import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { TransactionsFilterModalComponent } from '../../../shared/modals/transactions-filter-modal/transactions-filter-modal.component';

@Component({
  selector: 'app-transactions',
  imports: [MatButton],
  providers: [provideNativeDateAdapter()],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {

  readonly dialog = inject(MatDialog);


  openDialog(): void {
    const dialogRef = this.dialog.open(TransactionsFilterModalComponent, {
      // data: {},
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
