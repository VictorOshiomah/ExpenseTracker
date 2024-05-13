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
    //Bar chart
    const barCtx = document.getElementById('chart1') as HTMLCanvasElement;
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: this.expenses.map((expense) => expense.category),
        datasets: [
          {
            label: 'Amount',
            data: this.expenses.map((expense) => expense.amount),
            backgroundColor: 'rgb(145,163,176)',
            borderColor: 'rgb(145,163,176)',
            hoverBackgroundColor: '#23395d',
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
        },
        scales: {
          x: {
            display: false,
          },
        },
      },
    });

    //Pie chart
    const combinedData = {};
    this.expenses.forEach((expense) => {
      if (combinedData[expense.category]) {
        combinedData[expense.category] += expense.amount;
      } else {
        combinedData[expense.category] = expense.amount;
      }
    });

    const pieCtx = document.getElementById('chart2') as HTMLCanvasElement;

    const colorScheme = ['#23395d', 'rgb(145,163,176)', '#bec8d0'];

    new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: Object.keys(combinedData),
        datasets: [
          {
            label: 'Amount',
            data: Object.values(combinedData),
            backgroundColor: colorScheme,
            borderWidth: 1,
          },
        ],
      },
    });

    //Line chart
    const lineCtx = document.getElementById('chart3') as HTMLCanvasElement;
    new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: this.expenses.map((expense) => expense.category),
        datasets: [
          {
            label: 'Amount',
            data: this.expenses.map((expense) => expense.amount),
            borderColor: '#23395d',
            backgroundColor: 'transparent',
            borderWidth: 2,
            pointBackgroundColor: '#23395d',
            pointBorderColor: '#23395d',
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
