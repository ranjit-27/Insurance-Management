import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const agentGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const role = localStorage.getItem('role');

  if (role === 'agent') {
    return true;
  } else {
    alert('it can access agent only')
    router.navigate(['/login']); 
    return false;
  }
};
