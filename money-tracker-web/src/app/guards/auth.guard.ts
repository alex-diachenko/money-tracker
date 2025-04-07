import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const router = inject(Router);

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    const decoded: any = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decoded.exp && decoded.exp < now) {
      authService.logout();
      return false;
    }

    return true;
  } catch (err) {
    authService.logout();
    return false;
  }
};
