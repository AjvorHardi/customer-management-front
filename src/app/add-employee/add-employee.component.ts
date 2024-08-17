import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../Employee';
import { Role } from '../Role';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employee!: Partial<Employee>;
  errorMessage!: String;
  errorCode!: number;

  constructor(private router:Router, private employeeService:EmployeeService) { }

  ngOnInit(): void {    
    this.employee = {
      username: '',
      password: ''
    }
  }

  addEmployee() {
    this.employeeService.addEmployee(this.employee).subscribe({
      next: (employee: any) => {
        this.router.navigate(['employees']);
      },
      error: (e) => {
        console.log(e);
        if(e.error.password) {
          this.errorMessage = e.error.password;
        } else {
        this.errorMessage = e.error;
        }
        this.errorCode = e.status;
      }
    })
}

}
