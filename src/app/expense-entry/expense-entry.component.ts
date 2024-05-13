import { Component } from '@angular/core';

@Component({
  selector: 'app-expense-entry',
  templateUrl: './expense-entry.component.html',
  styleUrl: './expense-entry.component.css',
})
export class ExpenseEntryComponent {
  amount: number;
  date: any;
paymentMethod: any;
}
