import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  console.log(authService.isAuthenticated())
  // if (!authService.isAuthenticated()) {
  //   router.navigateByUrl('/login');
  //   return false;
  // }
  return true;
};
