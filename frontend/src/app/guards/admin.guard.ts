import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const role = localStorage.getItem('role');

  if (role === 'admin') {
    return true;
  } else {
    alert('it can access admin only')
    router.navigate(['/login']); 
    return false;
  }
};
