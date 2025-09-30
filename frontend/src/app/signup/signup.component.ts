import { Component, Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
    name:string="";
    email:string=""
    password:string="";
    role:string="";
    messeage:string="";


    constructor(public auth : AuthService,public router:Router) {}

    register() {
      this.auth.register({name:this.name,email:this.email,password:this.password,role:this.role})
      .subscribe((res)=>{
        this.messeage=res.messeage;
        localStorage.setItem('token',res.token);
        localStorage.setItem('role',res.user.role);
        localStorage.setItem('name',res.user.name);
        localStorage.setItem('userId',res.user._id);
        if(res.user.role=="customer"){
          this.router.navigate(['customer']);
        }else if(res.user.role=="admin"){ 
          this.router.navigate(['admin']);
        }else if(res.user.role=="agent"){
          this.router.navigate(['agent']);
        }
      });
    }
}
