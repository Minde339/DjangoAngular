import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError, empty } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  refreshingAccessToken: boolean;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Handle the request
    req = this.addAuthHeader(req);

    // call next() and handle the response

    return next.handle(req).pipe(
      catchError((error : HttpErrorResponse) => {
        console.log(error);

        if(error.status === 401 && !this.refreshingAccessToken) {
          // 401 error so we are unauthorized

          // refresh the access token
          return this.refreshAccessToken()
            .pipe(
              switchMap(() => {
                req = this.addAuthHeader(req);
                return next.handle(req);
              }),
              catchError((err : any) => {
                console.log(err);
                this.authService.logout();
                return empty();
              })
            )
        }
          return throwError(error);
      })
    )
  }
  

  refreshAccessToken() {
    this.refreshingAccessToken = true
    // we call method in auth service to send request to refresh token
    return this.authService.getNewAccessToken().pipe(
      tap(() => {
        this.refreshingAccessToken = false;
        console.log('Access Token Refreshed!');
      })
    )
  }

  addAuthHeader(req: HttpRequest<any>) {
      //get the access token
    const access_token = localStorage.getItem('access_token');

    if (access_token) {
      // append access token to the request headers
      return req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + access_token)
      })  
    } 
    return req;
  }
}
