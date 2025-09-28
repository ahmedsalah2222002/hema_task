import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TOKEN } from '../components/login/login.component';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem(TOKEN);

  if (token) return true;
  else {
    return router.navigate(['/login']);
  }
};



