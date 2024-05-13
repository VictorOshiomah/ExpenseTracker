import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-expense-entry',
  templateUrl: './expense-entry.component.html',
  styleUrl: './expense-entry.component.css',
})
export class ExpenseEntryComponent {
  amount: number = 0;
  date: string = '';
  category: string = '';
  method: string = '';
  submitUnSuccessful: boolean;
  expenses: any[];

  constructor(public httpClient: HttpClient, public router: Router) {}

  getData() {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    this.httpClient.get<any[]>('http://localhost:3000', options).subscribe({
      next: (data) => {
        console.log(data);
        this.expenses = data;
      },
      error: (err) => {
        console.error('Error occurred: ' + err);
      },
    });
  }

  onSubmit(ngForm: NgForm) {
    this.submitUnSuccessful = false;

    if (!ngForm.valid) {
      this.submitUnSuccessful = true;
      alert('All fields are required');
      return;
    }

    const formattedDate = this.formatDate(ngForm.value.date);

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    const data = {
      amount: this.amount,
      date: formattedDate,
      category: this.category,
      method: this.method,
    };

    console.log(data);

    this.httpClient
      .post<any>('http://localhost:3000', data, options)
      .subscribe({
        next: () => {
          console.log('Call successful');
          this.getData();
        },
        error: (err) => {
          console.error('Error occured: ' + JSON.stringify(err));
        },
      });

    ngForm.reset();
  }

  formatDate(date: string): string {
    const parts = date.split('-');
    return `${parts[1]}/${parts[2]}/${parts[0]}`;
  }
}
