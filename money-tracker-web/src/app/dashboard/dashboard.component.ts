import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HistoryComponent } from './components/history/history.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterOutlet,
    HistoryComponent,
    TransactionsComponent,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [],
})
export class DashboardComponent {

}
