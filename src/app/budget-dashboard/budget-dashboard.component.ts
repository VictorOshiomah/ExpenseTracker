import { Component } from '@angular/core';
import { Expense } from '../../server/src';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-budget-dashboard',
  templateUrl: './budget-dashboard.component.html',
  styleUrl: './budget-dashboard.component.css',
})
export class BudgetDashboardComponent implements OnInit {
  expenses: Expense[];

  constructor(public httpClient: HttpClient, public router: Router) {}

  ngOnInit(): void {
    this.fetchExpenses();
  }

  fetchExpenses(): void {
    this.httpClient
      .get<any[]>('http://localhost:3000')
      .subscribe((expenses) => {
        this.expenses = expenses;
        this.renderGraphs();
      });
  }

  renderGraphs(): void {

    const combinedData = {};
    this.expenses.forEach((expense) => {
      if (combinedData[expense.category]) {
        combinedData[expense.category] += expense.amount;
      } else {
        combinedData[expense.category] = expense.amount;
      }
    });

    const expByMethod = {};
    this.expenses.forEach((expense) => {
      if (expByMethod[expense.method]) {
        expByMethod[expense.method] += expense.amount;
      } else {
        expByMethod[expense.method] = expense.amount;
      }
    });

    this.expenses.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const expByDate = {};
    this.expenses.forEach((expense) => {
      if (expByDate[expense.date]) {
        expByDate[expense.date] += expense.amount; 
      } else {
        expByDate[expense.date] = expense.amount;
      }
    });

    //Bar chart
    const barCtx = document.getElementById('chart1') as HTMLCanvasElement;
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: Object.keys(combinedData),
        datasets: [
          {
            label: 'Amount',
            data: Object.values(combinedData),
            backgroundColor: '#008ac5',
            borderColor: '#008ac5',
            hoverBackgroundColor: '#0045a5',
            borderWidth: 1,
            borderRadius: 10,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Expenses by Category'
          }
        },
        scales: {
          x: {
            display: false,
          },
        },
      }
    });

    //Pie chart
    const pieCtx = document.getElementById('chart2') as HTMLCanvasElement;

    const colorScheme = ['#0b1d78', '#008ac5', '#1fe074', '#0045a5', '#0069c0', '#00a9b5', '#00c698'];

    new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: Object.keys(expByMethod),
        datasets: [
          {
            label: 'Amount',
            data: Object.values(expByMethod),
            backgroundColor: colorScheme,
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Expenses by Payment Method'
          }
        }
      }
    });

    //Line chart
    const lineCtx = document.getElementById('chart3') as HTMLCanvasElement;
    new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: Object.keys(expByDate),
        datasets: [
          {
            label: 'Amount',
            data: Object.values(expByDate),
            borderColor: '#1fe074',
            backgroundColor: 'transparent',
            borderWidth: 2,
            pointBackgroundColor: '#1fe074',
            pointBorderColor: '#1fe074',
            pointRadius: 2,
            pointHoverRadius: 5,
            fill: {
              target: 'origin',
              above: '#f8f9fa',
            },
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Expenses by Date'
          }
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
