import { HttpInterceptorFn } from '@angular/common/http';

export const authCookieInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
