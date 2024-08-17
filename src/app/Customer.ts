import { Employee } from "./Employee";

export interface Customer {
    firstName: string;
    lastName: string;
    city: string;
    email: string;
    id?: number;
    employee: Employee
  }
  