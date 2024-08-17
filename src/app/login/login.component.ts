import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../Employee';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  employee!: Partial<Employee>;
  errorMessage!: String;
  errorCode!: number;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.employee = {
      username: '',
      password: ''
    }
  }

 login() {
  this.authService.login(this.employee.username, this.employee.password).subscribe({
        next: (employee: any) => {
          let empJSON = JSON.stringify(employee);
          localStorage.setItem('currentEmployee', empJSON);
          this.router.navigate(['customers']);
        },
        error: (e) => {
          this.errorMessage = e.error;
          this.errorCode = e.status;
        }
      })
  }

  adminRedirect(){
    console.log("kliko")
    this.router.navigate(['admin']);
  }

}
