import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExpenseEntryComponent } from './expense-entry/expense-entry.component';
import { ExpenseTableComponent } from './expense-table/expense-table.component';
import { BudgetDashboardComponent } from './budget-dashboard/budget-dashboard.component';
import {AboutUsComponent} from "./about-us/about-us.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'expense-entry', component: ExpenseEntryComponent },
  { path: 'expense-table', component: ExpenseTableComponent },
  { path: 'budget-dashboard', component: BudgetDashboardComponent },
  {path: 'about-us', component: AboutUsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
