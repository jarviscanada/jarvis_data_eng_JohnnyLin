import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuotesComponent } from './quotes/quotes.component';
import { TraderAccountComponent } from './trader-account/trader-account.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},    //redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent }, 
  { path: 'quotes', component: QuotesComponent },
  { path: 'trader-account/:id', component: TraderAccountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
