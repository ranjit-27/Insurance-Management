import { Component, OnInit } from '@angular/core';
import { AgentService } from '../../services/agent.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agent',
  imports:[FormsModule,CommonModule],
  templateUrl: './agent-dashboard.component.html',
  styleUrls: ['./agent-dashboard.component.css']
})
export class AgentDashboardComponent implements OnInit {
  customers: any[] = [];
  claims: any[] = [];
  selectedCustomerPolicies: any[] = [];
  errorMessage = '';

  constructor(private agentService: AgentService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    this.agentService.getCustomers().subscribe({
      next: (res) => this.customers = res.customers,
      error: (err) => this.errorMessage = err.error.message
    });
  }

 

  viewCustomerPolicies(customerId: string) {
    this.agentService.getCustomerPolicies(customerId).subscribe({
      next: (res) => this.selectedCustomerPolicies = res.policies,
      error: (err) => this.errorMessage = err.error.message
    });
  }

  approvePolicy(policyId: string, status: string) {
    this.agentService.updatePolicyStatus(policyId, status).subscribe({
      next: () => this.loadCustomers(),
      error: (err) => this.errorMessage = err.error.message
    });
  }

 
}
