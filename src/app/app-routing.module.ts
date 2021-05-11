import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosGuard } from './guards/usuarios.guard';
import { LoginComponent } from './login/login.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  { 
    path: 'Login', 
    component: LoginComponent,
  },
  { 
    path: 'Usuarios', 
    component: UsuariosComponent,
    canActivate: [UsuariosGuard]
  },
  { 
    path: '', 
    redirectTo: '/Usuarios',    
    pathMatch: 'full',
  },
  {
    path: '**', 
    component: UsuariosComponent,
    canActivate: [UsuariosGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
