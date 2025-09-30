import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { PolicyComponent } from './admin/policy/policy.component';
import { DashboardComponent} from './customer/dashboard/dashboard.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { AgentDashboardComponent } from './agent/agent-dashboard/agent-dashboard.component';
import { PurchaseComponent } from './customer/purchase/purchase.component';
import { PolicyDetailComponent } from './customer/policy-detail/policy-detail.component';
import { MyPolicyComponent } from './customer/my-policy/my-policy.component';
import { UserPolicyDetailComponent } from './customer/user-policy-detail/user-policy-detail.component';
import { AgentsComponent } from './admin/agents/agents.component';
import { CustomersComponent } from './admin/customers/customers.component';
import { ClaimsComponent } from './customer/claims/claims.component';
import { PaymentComponent } from './customer/payment/payment.component';
import { AdminClaimsComponent } from './admin/claims/claims.component';
import { AdminPaymentsComponent } from './admin/payments/payments.component';
import { AclaimsComponent } from './agent/aclaims/aclaims.component';
import { AuditComponent } from './admin/audit/audit.component';
import { AboutComponent } from './about/about.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { agentGuard } from './guards/agent.guard';

export const routes: Routes = [ 
    
    {path:'register',component:SignupComponent},
    {path:'login',component:LoginComponent}, 
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path:'about',component:AboutComponent},
    {path:'customer',component:DashboardComponent, canActivate:[authGuard]},
    {path:'policy/:id',component:PolicyDetailComponent, canActivate:[authGuard]},
    {path:'customer/my-policies',component:MyPolicyComponent, canActivate:[authGuard]},
    {path:'customer/userpolicy/:id',component:UserPolicyDetailComponent,canActivate:[authGuard]},
    {path:'customer/claims',component:ClaimsComponent, canActivate:[authGuard]},
    {path:'customer/my-policies/claims/:id', component:ClaimsComponent, canActivate:[authGuard]},
    {path:'customer/claims',component:ClaimsComponent, canActivate:[authGuard]},
    {path:'purchase/:id',component:PurchaseComponent,canActivate:[authGuard]},
    {path:'customer/pay-premium',component:PaymentComponent,canActivate:[authGuard]},
    {path:'customer/pay-premium/:id',component:PaymentComponent,canActivate:[authGuard]},
    {path:'admin',component:AdmindashboardComponent,canActivate:[adminGuard]},
    {path:'admin/policy',component:PolicyComponent,canActivate:[adminGuard]},
    {path:'admin/agents',component:AgentsComponent,canActivate:[adminGuard]},
    {path:'admin/customers',component:CustomersComponent,canActivate:[adminGuard]},
    {path:'admin/claims',component:AdminClaimsComponent,canActivate:[adminGuard]},
    {path:'admin/payments',component:AdminPaymentsComponent,canActivate:[adminGuard]},
    {path:'admin/audit',component:AuditComponent,canActivate:[adminGuard]},
    {path:'agent',component:AgentDashboardComponent,canActivate:[agentGuard]},
    {path:'agent/claims',component:AclaimsComponent,canActivate:[agentGuard]},
];
