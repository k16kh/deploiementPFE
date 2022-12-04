import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../Services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isadmin:boolean=false;
  constructor(private route:Router,private service:UsersService){}
  canActivate(
     next:ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (localStorage.getItem("token")!=null){
       let roles=next.data["permittedRoles"] as Array<string>;
              if (roles){
                 if (this.service.roleMatch(roles)){
                  return true;
                 }
              }
      }
 return false;
}
}
