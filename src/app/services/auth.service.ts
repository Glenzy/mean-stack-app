import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { IAuthData } from '../shared/interfaces';


@Injectable({ providedIn: 'root' })
export class AuthService {
    token: string;

    constructor(private http: HttpClient) {
        this.token = '';
    }

    getToken() {
        return this.token;
    }

    signUpUser(email: string, password: string) {
        const authData: IAuthData = { "email": email, "password": password };
        const httpOptions = { headers: { 'Content-Type': 'application/json' } };
        this.http.post('http://localhost:3030/signup', authData, httpOptions)
            .subscribe(result => {
                console.log(result);
            });
    }

    loginUser(email: string, password: string) {
        const authData: IAuthData = { "email": email, "password": password };
        const httpOptions = { headers: { 'Content-Type': 'application/json' } };
        this.http.post<{ token: string }>('http://localhost:3030/login', authData, httpOptions)
            .subscribe(result => {
                this.token = result.token;
            });
    }
}