import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { IAuthData } from '../shared/interfaces';


@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private http: HttpClient) { }
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
        this.http.post('http://localhost:3030/signin', authData, httpOptions)
            .subscribe(result => {
                console.log(result);
            });
    }
}