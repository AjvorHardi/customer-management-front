import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Customer } from '../Customer';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  customer! : Partial<Customer>;
  errorMessage!: String;
  errorCode!: number;

  constructor(private customerService: CustomerService, private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.customer = {
      firstName: '',
      lastName: '',
      city: '',
      email: ''
    }
    this.getCustomerById();
  }

  getCustomerById() {
    // getting the id from the route and then converting it to a number
    // console.log(this.route.snapshot);
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.customerService.getCustomerById(id).subscribe(customer => {
      this.customer = customer;
    })
  }

  updateCustomer() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.customerService.updateCustomer(id, this.customer).subscribe({
      next: (customer: any) => {
        this.router.navigate(['customers']);
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

}
