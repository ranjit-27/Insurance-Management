import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuditService } from '../../services/audit.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-admindashboard',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  summary: any = {};

  constructor(private router: Router, private auditService: AuditService) { }

  ngOnInit(): void {
    this.loadSummary();
  }

  loadSummary() {
    this.auditService.getSummary().subscribe({
      next: (data) =>{
         this.summary = data
         console.log(this.summary)
      },
      error: (err) => console.error('Error loading summary', err)
    });
  }

  policy() { this.router.navigate(['/admin/policy']); }
  agents() { this.router.navigate(['/admin/agents']); }
  customers() { this.router.navigate(['/admin/customers']); }
  claims() { this.router.navigate(['/admin/claims']); }
  payments() { this.router.navigate(['/admin/payments']); }
  audit(){this.router.navigate(['admin/audit'])}
}
