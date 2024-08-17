import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Employee } from '../Employee';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = 'http://localhost:8090/api/employee';

  constructor(private http:HttpClient, private router:Router) { }

  adminLogin(username: any, password: any) {
    let string = window.btoa(`${username}:${password}`);
    console.log(string);
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Basic ${string}}`)
    }
    return this.http.post<any>(`${this.url}/admin`, { }, header);
  }


  login(username: any, password: any) {
    let string = window.btoa(`${username}:${password}`);
    console.log(string);
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Basic ${string}}`)
    }
    return this.http.post<any>(`${this.url}/login`, { }, header);
  }


  logout() {
    localStorage.removeItem('currentEmployee');
    this.router.navigate(['']);
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('currentEmployee')) {
      return true;
    } else {
      return false;
    }
  }

  isAdmin(): boolean {
    if (localStorage.getItem('currentEmployee')) {
      let currentEmployeeString = localStorage.getItem('currentEmployee') || '';
      let currentEmployee = JSON.parse(currentEmployeeString);
      let role = currentEmployee.role
      if (role === 'admin') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

}
