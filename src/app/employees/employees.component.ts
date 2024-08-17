import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../Employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees!:Employee[];
  errorMessage!: String;
  errorCode!: number;

  constructor(private employeeService:EmployeeService, private router:Router) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.employees = employees;
    })
  }

  makeAdmin(id:any) {
    this.employeeService.updateEmployee(id).subscribe({
      next: (customer: any) => {
        this.ngOnInit();
    },
    error: (e) => {
      this.errorCode = e.status;
      if (this.errorCode === 401) {
        this.router.navigate(['unauthorized']);
      }
      this.errorMessage = e.error.email;
    }
  })
}

deleteEmployee(id:any) {
  this.employeeService.deleteEmployee(id).subscribe(
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

  
}
