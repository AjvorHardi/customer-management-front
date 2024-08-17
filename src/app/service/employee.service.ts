import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Employee';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url: string = 'http://localhost:8090/api/employee';
  

  constructor(private http:HttpClient) { }

  addEmployee(employee: Partial<Employee>) {
    console.log(employee);
    return this.http.post<Employee>(`${this.url}`, employee);
  }

  getAllEmployees() {
    return this.http.get<Employee[]>(`${this.url}`);
  }


  updateEmployee(id: number) {
    console.log(id);
    let userDetailsString = localStorage.getItem('currentEmployee') || '';
    let userDetailsObj = JSON.parse(userDetailsString);
    console.log(userDetailsObj);
    let username = userDetailsObj.username;
    let password = userDetailsObj.password;
    let string = window.btoa(`${username}:${password}`);
    console.log(string);
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Basic ${string}}`)
    }
    return this.http.put<Employee>(`${this.url}/${id}`, {}, header);
  }


  deleteEmployee(id: number) {
    let currentEmployeeString = localStorage.getItem('currentEmployee') || '';
    let currentEmployee = JSON.parse(currentEmployeeString);
    let username = currentEmployee.username;
    let password = currentEmployee.password;
    let string = window.btoa(`${username}:${password}`);
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Basic ${string}}`)
    }
    return this.http.delete(`${this.url}/${id}`, header);
  }

}
