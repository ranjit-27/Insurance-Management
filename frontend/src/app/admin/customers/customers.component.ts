import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: any[] = [];
  selectedCustomerPolicies: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  // Load all customers
  loadCustomers() {
    this.adminService.getAllCustomers().subscribe((res: any) => {
      this.customers = res.customers;
    });
  }

  // Load policies for a specific customer
  getCustomerPolicies(customerId: string) {
    this.adminService.getCustomerPolicies(customerId).subscribe((res: any) => {
      this.selectedCustomerPolicies = res.policies;
    });
  }
  admin(){
    window.location.href="/admin";
  }
}
