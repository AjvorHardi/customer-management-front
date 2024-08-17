import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../Customer';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  url: string = 'http://localhost:8090/api/customer';

  constructor(private http: HttpClient) { }

  getAllCustomers() {
    return this.http.get<Customer[]>(`${this.url}`);
  }

  getAllYourCustomers(id:any) {
    return this.http.get<Customer[]>(`${this.url}/employee/${id}`);
  }

  getCustomerById(id:number) {
    return this.http.get<Customer>(`${this.url}/${id}`);
  }

  addCustomer(customer: Partial<Customer>) {
    return this.http.post<Customer>(`${this.url}`, customer);
  }

  updateCustomer(id: number, customer: Partial<Customer>) {
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
    return this.http.put<Customer>(`${this.url}/${id}`, customer, header);
  }

  deleteCustomer(id: number) {
    let userDetailsString = localStorage.getItem('currentEmployee') || '';
    let userDetailsObj = JSON.parse(userDetailsString);
    let username = userDetailsObj.username;
    let password = userDetailsObj.password;
    let string = window.btoa(`${username}:${password}`);
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Basic ${string}}`)
    }
    console.log("servis okinuo brisanje");
    return this.http.delete(`${this.url}/${id}`, header);
  }

  searchCustomers(searchTerm: String) {
    return this.http.get(`${this.url}/search?term=${searchTerm}`);
  }

}


