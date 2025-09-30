import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Mock AuthService
class MockAuthService {
  register(userData: any) {
    return of({
      messeage: 'User registered successfully',
      token: 'mock-token',
      user: { _id: '123', name: userData.name, role: userData.role }
    });
  }
}

class MockRouter {
  navigate(path: string[]) { return path; }
}

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, SignupComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create SignupComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty initial values', () => {
    expect(component.name).toBe('');
    expect(component.email).toBe('');
    expect(component.password).toBe('');
    expect(component.role).toBe('');
    expect(component.messeage).toBe('');
  });

  it('should bind input fields with ngModel', async () => {
    const compiled = fixture.nativeElement;
    const nameInput = compiled.querySelector('input[type="text"]');
    const emailInput = compiled.querySelector('input[type="email"]');
    const passwordInput = compiled.querySelector('input[type="password"]');
    const select = compiled.querySelector('select');

    nameInput.value = 'John Doe';
    nameInput.dispatchEvent(new Event('input'));
    emailInput.value = 'john@example.com';
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.value = '123456';
    passwordInput.dispatchEvent(new Event('input'));
    select.value = 'customer';
    select.dispatchEvent(new Event('change'));
    
    fixture.detectChanges();

    expect(component.name).toBe('John Doe');
    expect(component.email).toBe('john@example.com');
    expect(component.password).toBe('123456');
    expect(component.role).toBe('customer');
  });

  it('should call register() and store token, role, name, userId', () => {
    component.name = 'John Doe';
    component.email = 'john@example.com';
    component.password = '123456';
    component.role = 'customer';

    spyOn(router, 'navigate').and.callThrough();

    component.register();

    expect(component.messeage).toBe('User registered successfully');
    expect(localStorage.getItem('token')).toBe('mock-token');
    expect(localStorage.getItem('role')).toBe('customer');
    expect(localStorage.getItem('name')).toBe('John Doe');
    expect(localStorage.getItem('userId')).toBe('123');
    expect(router.navigate).toHaveBeenCalledWith(['customer']);
  });

  it('should navigate to admin if role is admin', () => {
    component.name = 'Admin';
    component.email = 'admin@example.com';
    component.password = 'admin123';
    component.role = 'admin';

    spyOn(router, 'navigate').and.callThrough();
    component.register();

    expect(localStorage.getItem('role')).toBe('admin');
    expect(router.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('should navigate to agent if role is agent', () => {
    component.name = 'Agent';
    component.email = 'agent@example.com';
    component.password = 'agent123';
    component.role = 'agent';

    spyOn(router, 'navigate').and.callThrough();
    component.register();

    expect(localStorage.getItem('role')).toBe('agent');
    expect(router.navigate).toHaveBeenCalledWith(['agent']);
  });

  it('should handle empty form submission', () => {
    component.name = '';
    component.email = '';
    component.password = '';
    component.role = '';

    spyOn(router, 'navigate').and.callThrough();
    component.register();

    
    expect(component.messeage).toBe('User registered successfully');
  });

});
