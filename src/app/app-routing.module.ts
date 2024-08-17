import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomersComponent } from './customers/customers.component';
import { EmployeesComponent } from './employees/employees.component';
import { UnauthorizedComponent } from './error-pages/unauthorized/unauthorized.component';
import { LoginComponent } from './login/login.component';
import { AuthAdminGuardService } from './service/auth-admin-guard.service';
import { AuthGuardService } from './service/auth-guard.service';
import { YourCustomersComponent } from './your-customers/your-customers.component';

const routes: Routes = [
  {
    path: 'add-customer',
    component: AddCustomerComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'customers/:id',
    component: CustomerDetailsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'your-customers',
    component: YourCustomersComponent
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: 'admin',
    component: AdminLoginComponent
  },
  {
    path: 'add-employee',
    component: AddEmployeeComponent,
    canActivate: [AuthAdminGuardService]
  },
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [AuthAdminGuardService]
  },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
