import { Component, OnInit } from '@angular/core';
import { AgentService } from '../../services/agent.service';
import { Claim } from '../../models/claim';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-aclaims',
  imports:[FormsModule,CommonModule],
  templateUrl: './aclaims.component.html',
  styleUrls: ['./aclaims.component.css']
})
export class AclaimsComponent implements OnInit {

  claims: Claim[] = [];
  errorMessage: string = '';

  constructor(private agentService: AgentService) {}

  ngOnInit(): void {
    this.loadClaims();
  }

  loadClaims(): void {
    this.agentService.getClaims().subscribe({
      next: (res: { claims: Claim[] }) => this.claims = res.claims,
      error: (err: any) => this.errorMessage = err?.error?.message || 'Something went wrong'
    });
  }

  approveClaim(claimId: string, status: 'approved' | 'rejected'): void {
    this.agentService.updateClaimStatus(claimId, status).subscribe({
      next: () => this.loadClaims(),
      error: (err: any) => this.errorMessage = err?.error?.message || 'Failed to update claim'
    });
  }
}
