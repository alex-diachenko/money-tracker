import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HistoryComponent } from './components/history/history.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, HistoryComponent, TransactionsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: []
})
export class DashboardComponent {

}
