import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../Employee';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUsername!: String;
  currentEmployee!: Employee;
  role!: String;

  constructor(private router:Router, private auth:AuthService) { }

  ngOnInit(): void {
    let currentEmployeeString = localStorage.getItem('currentEmployee') || '';
    let currentEmployee = JSON.parse(currentEmployeeString);
    this.currentEmployee = currentEmployee;
    this.role = currentEmployee.role;
  }

  logout() {
    this.auth.logout();
  }

  isAdmin() {
    if (this.currentEmployee.role === 'admin') {
      return true
    } else {
      return false
    }
  }

  // isLoggedIn(): boolean {
  //   if (localStorage.getItem('currentEmployee')) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }


}
