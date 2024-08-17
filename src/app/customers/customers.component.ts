import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../Customer';
import { CustomerService } from '../service/customer.service';
import { Employee } from '../Employee';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers! : Customer[];
  searchTerm!: String;
  currentEmployee!: Employee;
  errorMessage!: String;
  errorCode!: number;
  sortFirstFlag: boolean=true;
  sortLastFlag: boolean=true;
  sortCityFlag: boolean=true;
  sortEmailFlag: boolean=true;


  constructor(private customerService:CustomerService, private router:Router) { }

  ngOnInit(): void {
    this.getAllCustomers();
    let currentEmployeeString = localStorage.getItem('currentEmployee') || '';
    let currentEmployee = JSON.parse(currentEmployeeString);
    this.currentEmployee = currentEmployee;
  }

  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe(customers => {
      this.customers = customers;
      console.log(customers);
    })
  }

  getAllYourCustomers() {
    let id = this.currentEmployee.id;
    this.customerService.getAllYourCustomers(id).subscribe(customers => {
      this.customers = customers;
      console.log(customers);
    })
  }

  editCustomer(id:any) {
    this.router.navigate(['customers/', id]);
  }

  deleteCustomer(id:any) {
    this.customerService.deleteCustomer(id).subscribe(
      {
      next: (res) => {
        this.ngOnInit();
      },
      error: (err) => {
        this.errorMessage = err.error;
        this.errorCode = err.status;
        this.router.navigate(['unauthorized']);
      }
    }
    
    );
  }

  sortFirst() {
    if (this.sortFirstFlag) {
      this.customers.sort((a, b) => a.firstName.localeCompare(b.firstName))
      this.sortFirstFlag = false;
    } else {
      this.customers.sort((b, a) => a.firstName.localeCompare(b.firstName))
      this.sortFirstFlag = true;
    }
  }
  sortLast() {
    if (this.sortLastFlag) {
      this.customers.sort((a, b) => a.lastName.localeCompare(b.lastName))
      this.sortLastFlag = false;
    } else {
      this.customers.sort((b, a) => a.lastName.localeCompare(b.lastName))
      this.sortLastFlag = true;
    }
  }
  sortCity() {
    if (this.sortCityFlag) {
      this.customers.sort((a, b) => a.city.localeCompare(b.city))      
      this.sortCityFlag = false;
    } else {
      this.customers.sort((b, a) => a.city.localeCompare(b.city))    
      this.sortCityFlag = true;
    }
  }
  sortEmail() {
    if (this.sortEmailFlag) {
      this.customers.sort((a, b) => a.email.localeCompare(b.email))      
      this.sortEmailFlag = false;
    } else {
      this.customers.sort((b, a) => a.email.localeCompare(b.email))
      this.sortEmailFlag = true;
    }
  }

  // handleSubmit(e){
  //   e.preventDefault();
  //   console.log(this.searchTerm);
  // }


  searchCustomers(){
    console.log(this.searchTerm);
    this.customerService.searchCustomers(this.searchTerm).subscribe((customers:any) => {
        this.customers = customers;
        console.log(customers);
    })
  }

  // delete(id: any) {
  //   this.customerService.deleteCustomer(id).subscribe({
  //     next: (res) => {
  //       this.customerList = this.customerList?.filter((el) => el.id != id);
  //       this.deleteSuccess = true;
  //       setTimeout(() => {
  //         this.deleteSuccess = false;
  //       }, 2000);
  //     },
  //     error: (err) => {
  //       this.deleteError = true;
  //       setTimeout(() => {
  //         this.deleteError = false;
  //         this.router.navigate(['error-page']);
  //       }, 2000);
  //     },
  //   });
  // }

}
