import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Obtener el token del localStorage
  const token = localStorage.getItem('token');

  // 2. Clonar la petición (Las peticiones son inmutables)
  // Si hay token, lo inyectamos. Si no, dejamos la petición original.
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }

  // 3. Si no hay token, pasa la petición tal cual
  return next(req);
};
