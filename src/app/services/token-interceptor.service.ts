import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {catchError, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isAuthenticated = this.authService.isAuthenticated();

    if (isAuthenticated) {
      req = this.addToken(req, this.authService.getAccessToken());
    }
    return next.handle(req).pipe((catchError((res: HttpErrorResponse) => {
      if (res && res.error) {
        if (res instanceof HttpErrorResponse && res.status === 401) {
          console.log('***401***');
          return this.handle401Error(req, next);
        }
        console.log(res.error.details);
      }
      console.log(res);
      if (res.status === 403) {
        console.log('***403***');
        this.router.navigate(['auth/login'], {
          queryParams: {
            sessionFiled: true
          }
        });
      }
    }))) as any;

  }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({setHeaders: {Authorization: `${token}`}});
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): any {
    return this.authService.refreshToken().pipe(
      switchMap((tokens) => {
        console.log(tokens);
        return next.handle(this.addToken(req, tokens.access_token));
      })
    );
  }
}
