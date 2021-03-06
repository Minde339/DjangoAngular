import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, shareReplay } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

export interface AuthResponseData {
    access_token: string;
    refresh_token: string;
}

export interface AccessResponseData {
    access: string;
}

@Injectable()
export class AuthService {

    constructor(private http: HttpClient,private router: Router) {}

    private setSession(AuthRes) {
        localStorage.setItem('access', AuthRes.access_token);
        localStorage.setItem('refresh_token', AuthRes.refresh_token);
    }
    private RefreshSession(Respond) {
        localStorage.setItem('access', Respond.access);
    }

    

    getAccesstoken() {
        return localStorage.getItem('access');
    }

    getRefreshtoken() {
        return localStorage.getItem('refresh_token');
        }


    getNewAccessToken() {
        return this.http.post<AccessResponseData>('http://127.0.0.1:8000/dj-rest-auth/token/refresh/',
        {
            'refresh' : this.getRefreshtoken()
        },
        {
            observe: 'response'
        }).pipe(
            tap(response =>
                this.RefreshSession(response.body)),
                shareReplay(),
        );
    }
        

    login(username:string, email:string, password1:string) {
            return this.http.post<AuthResponseData>('http://127.0.0.1:8000/dj-rest-auth/login/',
        {
            username: username,
            email: email,
            password: password1,
        }).pipe(catchError(this.handleError), tap(response =>  this.setSession(response)),
        shareReplay(),
    );
    }

    signup(username: string, email: string, password1:string, password2:string){
        return this.http.post<AuthResponseData>(
                'http://127.0.0.1:8000/dj-rest-auth/registration/',
            {   
                username: username,
                email: email,
                password1: password1,
                password2: password2
            }).pipe(catchError(this.handleError), tap(response =>  this.setSession(response)),
                shareReplay(),
            );
    }

    logout(){
        localStorage.removeItem('access');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.router.navigate(['/auth']);
    }

    private handleError(errorRes: HttpErrorResponse) {
        return throwError(errorRes);
    }

}
