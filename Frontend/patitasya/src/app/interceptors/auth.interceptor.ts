import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  
  console.log('Interceptor - Token:', token); // Debug
  
  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    console.log('Interceptor - Request con auth:', cloned.headers.get('Authorization'));
    return next(cloned);
  }
  
  console.log('Interceptor - Request SIN auth');
  return next(req);
};
