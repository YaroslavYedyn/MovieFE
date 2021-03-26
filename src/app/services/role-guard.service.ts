import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;

    const token = this.authService.getAccessToken();

    console.log(token);

    const tokenData = decode(token);

    console.log(tokenData);

    // @ts-ignore
    const {role} = tokenData;
    console.log(expectedRole);

    if (!this.authService.isAuthenticated() || role !== expectedRole) {
      this.router.navigate(['error/not/auth']);
      return false;
    }
    return true;
  }

  setRole(data): boolean {
    const token = this.authService.getAccessToken();

    const tokenData = decode(token);

    // @ts-ignore
    const {role} = tokenData;

    return !(!this.authService.isAuthenticated() || role !== data);
  }
}
