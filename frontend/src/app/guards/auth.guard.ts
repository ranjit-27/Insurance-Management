import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const role = localStorage.getItem('role');

  if (role === 'customer') {
    return true;
  } else {
    alert('it can access customer only')
    router.navigate(['/login']); 
    return false;
  }
};
