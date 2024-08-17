import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../Customer';
import { CustomerService } from '../service/customer.service';
import { Employee } from '../Employee';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  customer! : Partial<Customer>;
  currentEmployee!: Employee;
  errorMessage!: String;
  errorCode!: number;

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    let currentEmployeeString = localStorage.getItem('currentEmployee') || '';
    let currentEmployee = JSON.parse(currentEmployeeString);
    this.currentEmployee = currentEmployee;
    this.customer = {
      firstName: '',
      lastName: '',
      city: '',
      email: '',
      employee: currentEmployee
    }
  }

  addCustomer() {
    this.customerService.addCustomer(this.customer).subscribe({
      next: (customer: any) => {
        this.router.navigate(['customers']);
      },
      error: (e) => {
        console.log(e);
        this.errorMessage = e.error.email;
        this.errorCode = e.status;
      }
    })
}
}