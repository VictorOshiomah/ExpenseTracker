import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Expense} from "../../server/src";
import {HttpClientModule} from "@angular/common/http";


@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.css'
})

export class ExpenseTableComponent implements OnInit{

  expenses: Expense[];

  constructor(public httpClient: HttpClient) {}

  ngOnInit(): void {
    this.fetchExpenses();
  }

  fetchExpenses(): void {
    this.httpClient.get<any[]>("http://localhost:3000")
      .subscribe(expenses => {
        this.expenses = expenses;
      });
  }



}
