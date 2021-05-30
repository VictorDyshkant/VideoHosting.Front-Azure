import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    
    constructor(private nav: Router) {

    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (localStorage.getItem(environment.token)) {
            return true;
        }

        this.nav.navigate(['/login']);
        return false;
    }
}