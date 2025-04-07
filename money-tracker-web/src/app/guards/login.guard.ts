import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { inject } from '@angular/core';

export const LoginGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const token = inject(AuthService).getToken();

  if (token) {
    inject(Router).navigate(['/dashboard']);
    return false;
  }
  return true;
};
