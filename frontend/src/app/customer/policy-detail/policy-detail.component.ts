import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PolicyProduct } from '../../models/policyproduct';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-policy-detail',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './policy-detail.component.html',
  styleUrls: ['./policy-detail.component.css']
})
export class PolicyDetailComponent implements OnInit {
  policy: PolicyProduct | undefined;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void { 
  const id = this.route.snapshot.paramMap.get('id'); 
  if (id) {
    this.customerService.getPolicyById(id).subscribe(
      (data: any) => {  
        this.policy = data.policy; 
      },
      (error) => {
        console.error('Error fetching policy details', error);
      }
    );  
  }
}


  purchasePolicy() {
    if (this.policy && this.policy._id) {
      this.router.navigate(['/purchase', this.policy._id]);
    }
  }

  backToAll() {
    this.router.navigate(['/customer']);
  }
}
