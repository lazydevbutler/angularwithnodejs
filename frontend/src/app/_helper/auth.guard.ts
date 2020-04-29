﻿import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '../_service';

// let user = JSON.parse(localStorage.getItem('user')) || [];

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.getUser || null;
        console.log(route.data.roles[0])
        console.log(user.role)
        if(user){
            console.log(route.data)
            if(route.data.roles &&  route.data.roles[0] !== user.role){
                //not authorise for admin
                console.log("HUH")
                this.router.navigate(['/']);
                return false
            }
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}