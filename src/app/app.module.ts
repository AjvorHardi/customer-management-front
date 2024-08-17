import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { YourCustomersComponent } from './your-customers/your-customers.component';
import { FooterComponent } from './footer/footer.component';
import { UnauthorizedComponent } from './error-pages/unauthorized/unauthorized.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeesComponent } from './employees/employees.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    CustomerDetailsComponent,
    AddCustomerComponent,
    LoginComponent,
    NavbarComponent,
    YourCustomersComponent,
    FooterComponent,
    UnauthorizedComponent,
    AddEmployeeComponent,
    AdminLoginComponent,
    EmployeeDetailsComponent,
    EmployeesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
