import { Component, OnInit } from '@angular/core';
import { AgentService } from '../../services/agent.service'; // adjust path to your service
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuditLog } from '../../models/audit';
import { AuditService } from '../../services/audit.service';

@Component({
  selector: 'app-audit',
  imports:[CommonModule,FormsModule],
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {
  auditLogs: AuditLog[] = [];
  errorMessage: string = '';
  loading: boolean = true;

  constructor(private agentService: AgentService,public as:AuditService) {}

  ngOnInit(): void {
    this.loadAuditLogs();
  }

  loadAuditLogs() {
    this.loading = true;
    this.as.getAuditLogs().subscribe({
      next: (res: any) => {
        this.auditLogs = res.logs || res; // backend might return {logs:[]} or []
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load audit logs';
        this.loading = false;
      }
    });
  }
}
