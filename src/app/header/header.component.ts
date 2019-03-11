import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
    userIsAuthenticated = false;
    AuthListenerSubscription: Subscription;
    constructor(private authservice: AuthService) { }
    ngOnInit() {
        console.log('############# ', this.authservice);
        this.userIsAuthenticated = this.authservice.getAuthenticatedStatus();
        this.AuthListenerSubscription = this.authservice.getAuthStatusListener().subscribe((isAuthenticated) => {
            console.log(isAuthenticated);
            this.userIsAuthenticated = isAuthenticated;
        });
    }
    ngOnDestroy() {
        this.AuthListenerSubscription.unsubscribe()
    }

    logOutUser() {
        this.authservice.logOutUser();
    }
}