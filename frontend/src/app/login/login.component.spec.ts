import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';

class MockAuthService {
  setRole = jasmine.createSpy('setRole');
  login(credentials: any) {
    if (!credentials.email || !credentials.password) {
      return throwError(() => ({ error: { message: 'Email or password missing' } }));
    }
    if (credentials.email === 'fail@example.com') {
      return throwError(() => ({ error: { message: 'Invalid credentials' } }));
    }
    return of({
      token: 'fake-token',
      user: {
        role: credentials.email.includes('admin')
          ? 'admin'
          : credentials.email.includes('agent')
          ? 'agent'
          : 'customer',
        name: 'Test User',
        _id: '123'
      }
    });
  }
}

describe('LoginComponent (standalone)', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: MockAuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, FormsModule, RouterTestingModule],
      providers: [{ provide: AuthService, useClass: MockAuthService }]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as unknown as MockAuthService;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should display error message on invalid credentials', () => {
    component.email = 'fail@example.com';
    component.password = 'wrong';
    component.login();
    fixture.detectChanges();
    const errorEl = fixture.debugElement.query(By.css('div.text-red-500'));
    expect(errorEl.nativeElement.textContent).toContain('Invalid credentials');
  });

  it('should not call AuthService.login if email is empty', () => {
    spyOn(authService, 'login').and.callThrough();
    component.email = '';
    component.password = '123456';
    component.login();
    expect(authService.login).not.toHaveBeenCalled();
    expect(component.errorMessage).toBe('Email or password missing');
  });

  it('should not call AuthService.login if password is empty', () => {
    spyOn(authService, 'login').and.callThrough();
    component.email = 'test@example.com';
    component.password = '';
    component.login();
    expect(authService.login).not.toHaveBeenCalled();
    expect(component.errorMessage).toBe('Email or password missing');
  });

  it('should reset email and password after successful login', () => {
    spyOn(router, 'navigate');
    component.email = 'customer@example.com';
    component.password = '123456';
    component.login();
    fixture.detectChanges();
    expect(component.email).toBe('');       
    expect(component.password).toBe('');    
    expect(router.navigate).toHaveBeenCalledWith(['customer']);
  });
});
