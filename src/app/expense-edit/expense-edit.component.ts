import { Component } from '@angular/core';
import {Expense} from "../../server/src";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-expense-edit',
  templateUrl: './expense-edit.component.html',
  styleUrl: './expense-edit.component.css'
})
export class ExpenseEditComponent {
  expenseId: number;
  expenses: Expense;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.expenseId = +params['id'];
      this.fetchExpense();
    });
  }

  fetchExpense(): void {
    this.httpClient.get<any>(`http://localhost:3000/${this.expenseId}`)
      .subscribe(expense => {
        this.expenses = expense;
      });
  }

  updateExpense(): void {
    this.httpClient.put(`http://localhost:3000/${this.expenseId}`, this.expenses)
      .subscribe(() => {
        this.router.navigate(['/expense-table']);
      });
  }

  deleteExpense(): void {
    if (confirm(`Please confirm deletion of expense ${this.expenseId}.`)) {
      this.httpClient.delete(`http://localhost:3000/${this.expenseId}`)
        .subscribe(() => {
          this.router.navigate(['/expense-table']);
        });
    }
  }
}
