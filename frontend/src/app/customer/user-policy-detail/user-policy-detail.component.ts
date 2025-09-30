import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserPolicy } from '../../models/userpolicy';
@Component({
  selector: 'app-user-policy-detail',
  imports:[CommonModule,RouterOutlet,FormsModule],
  templateUrl: './user-policy-detail.component.html',
  styleUrls: ['./user-policy-detail.component.css']
})
export class UserPolicyDetailComponent implements OnInit {
  policy: UserPolicy | undefined;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) {}

 ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id'); // Get policy ID from URL
  if (id) {
    this.customerService.getuserPolicyById(id).subscribe({
      next: (res) => {
        // unwrap response
        this.policy = res.policy;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching policy', err);
        this.loading = false;
      }
    });
  }
}


  backToMyPolicies(): void {
    this.router.navigate(['/customer/my-policies']);
  }

  cancelPolicy(): void {
    if (!this.policy) return;
    this.customerService.cancelPolicy(this.policy._id!).subscribe({
      next: () => {
        alert('Policy cancelled successfully!');
        this.backToMyPolicies();
      },
      error: (err) => console.error(err)
    });
  }

}
