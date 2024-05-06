import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'expense-tracker';
  constructor(public router: Router) {}

  onSelectChange(e: any) {
    const selection = e.target.value;
    this.router.navigate([selection]);
  }

  budgetDashboardOnClick() {
    this.router.navigate(['/budget-dashboard'])
  }
}
