import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { IAuthData } from '../shared/interfaces';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthService {
    token: string;
    private authStatusListener = new Subject<boolean>();
    private isAuthenticated = false;
    private authenticationExpiresIn: number;
    private tokenTimer: any;

    constructor(private http: HttpClient, private router: Router) {
        this.token = '';
    }

    getToken() {
        return this.token;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    getAuthenticatedStatus() {
        return this.isAuthenticated;
    }

    signUpUser(email: string, password: string) {
        const authData: IAuthData = { "email": email, "password": password };
        const httpOptions = { headers: { 'Content-Type': 'application/json' } };
        this.http.post('http://localhost:3030/signup', authData, httpOptions)
            .subscribe(result => {
                console.log(result);
                this.router.navigate(['/']);
            });
    }

    loginUser(email: string, password: string) {
        const authData: IAuthData = { "email": email, "password": password };
        const httpOptions = { headers: { 'Content-Type': 'application/json' } };
        this.http.post<{ token: string, expiresIn: number }>('http://localhost:3030/login', authData, httpOptions)
            .subscribe(result => {
                this.token = result.token;
                this.authStatusListener.next(true);
                this.isAuthenticated = true;
                this.authenticationExpiresIn = result.expiresIn;
                this.setTokenTimer(this.authenticationExpiresIn);
                const now = new Date();
                const expirationDate = new Date(now.getTime() + this.authenticationExpiresIn * 1000);
                this.saveAuthData(this.token, expirationDate)
                this.router.navigate(['/']);
            });
    }

    logOutUser() {
        this.authStatusListener.next(false);
        this.isAuthenticated = false;
        this.router.navigate(['/']);
        this.clearAuthData();
        clearTimeout(this.tokenTimer);
        return this.token = '';
    }


    autoAuthUser() {

        const authInformation = this.getAuthData();
        const now = new Date();
        const expirationDate = Date.parse(authInformation.expirationDate);
        const expiresIn = (expirationDate * 1000) - now.getTime();
        console.log('autoAuth called expires in: ', expirationDate);
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.setTokenTimer(expiresIn);
            this.authStatusListener.next(true);
        }
    }

    private setTokenTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
            this.logOutUser();
        }, duration * 1000);
    }

    private saveAuthData(token: string, expirationDate: Date) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
    }
    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        if (!token || !expirationDate) {
            return;
        }
        return {
            token,
            expirationDate
        }
    }
}