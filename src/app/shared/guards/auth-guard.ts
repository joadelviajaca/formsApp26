import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificamos si hay usuario en el Signal
  // (Ojo: AuthService ya valida el token al iniciar la app)
  if (authService.user()) {
    return true; // ✅ Pasa
  }

  // ❌ Si no está logueado, lo mandamos al login
  router.navigate(['/auth/login']);
  return false;
};
