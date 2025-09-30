import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // <-- new property

  constructor(public auth: AuthService, public router: Router) {}

  login() {
    if(this.email == '' && this.password=='') alert('fields are required')
    this.errorMessage = ''; // clear previous error
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.user.role);
        localStorage.setItem('name', res.user.name);
        localStorage.setItem('userId', res.user._id);
        this.auth.setRole(res.user.role);

        if (res.user.role == 'customer') {
          this.router.navigate(['customer']);
        } else if (res.user.role == 'admin') {
          this.router.navigate(['admin']);
        } else if (res.user.role == 'agent') {
          this.router.navigate(['agent']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Invalid credentials';
      }
    });
  }
}
