import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserPolicy } from '../../models/userpolicy';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agents',
  imports:[FormsModule,CommonModule],
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = 'agent';

  agents: any[] = [];
  selectedAgentPolicies: any[] = [];

  unassignedPolicies:UserPolicy[] = [];
  selectedPolicyMap: { [agentId: string]: string } = {};

  constructor(private adminService: AdminService,public router:Router) {}

  ngOnInit(): void {
    this.loadAgents();
    this.loadUnassignedPolicies();
  }


  loadAgents() {
    this.adminService.getAllAgents().subscribe((res: any) => {
      this.agents = res.agents;
    });
  }


  loadUnassignedPolicies() {
  this.adminService.getUnassignedUserPolicies().subscribe((res: any) => {
    // Use the actual key returned by backend
    this.unassignedPolicies = res.unassignedPolicies  || [];
  });
}


  
  createAgent() {
    if (!this.name || !this.email || !this.password) {
      alert('Please fill all fields.');
      return;
    }

    this.adminService.createAgent({
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    }).subscribe(() => {
      alert('Agent Created Successfully');
      this.name = '';
      this.email = '';
      this.password = '';
      this.loadAgents();
    });
  }


  assignAgent(agentId: string) {
    const selectedPolicyId = this.selectedPolicyMap[agentId];
    if (!selectedPolicyId) {
      alert('Please select a user policy.');
      return;
    }

    this.adminService.assignAgent(agentId, selectedPolicyId).subscribe(() => {
      alert('Agent Assigned Successfully');
      this.selectedPolicyMap[agentId] = '';
      this.loadUnassignedPolicies(); 
    });
  }

 
  getAgentPolicies(agentId: string) {
    this.adminService.getAgentPolicies(agentId).subscribe((res: any) => {
      this.selectedAgentPolicies = res.policies;
    });
  }

  admin(){
    this.router.navigate(['/admin'])
  }
}
