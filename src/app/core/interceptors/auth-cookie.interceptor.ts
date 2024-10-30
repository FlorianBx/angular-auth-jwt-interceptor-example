import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authCookieInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authService.checkAuthentication().pipe(
          switchMap(() => {
            return next(req);
          }),
          catchError((refreshError) => {
            authService.signOut();
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
