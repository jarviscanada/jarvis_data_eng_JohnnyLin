import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  currentNav: string = "Dashboard";

  setDashboardNav(): void {
    this.currentNav = 'Dashboard';
  }

  setQuotesNav(): void {
    this.currentNav = 'Quotes';
  }
}
