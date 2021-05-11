import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Session } from 'inspector';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosGuard implements CanActivate {
  constructor(public route: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.ValidarSesion();
  }
  ValidarSesion(): boolean{
    let Validacion: boolean = false;
    if(sessionStorage["Session"] != "" && sessionStorage["Session"] != null){
      Validacion = true;
    }
    else{
      Validacion = false;
      this.route.navigate(['/Login']);
    }
    return Validacion;
  }
}
