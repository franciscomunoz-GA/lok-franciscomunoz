import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServicioService } from '../servicio.service';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  InputEmail = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  
  InputContrasena = new FormControl('', [
    Validators.required,
  ]);
  hide = true;
  matcher = new MyErrorStateMatcher();
  Cargando: boolean = false;
  //variable para el servicio
  ObtenerServicio: any;
  constructor(private snackBar: MatSnackBar,
              public route: Router,
              private http: HttpClient,) { 
    this.ObtenerServicio = new ServicioService(this.http);
  }

  ngOnInit(): void {
  }
  
  ValidarUsuario(){
    //mostramos progressbar
    this.Cargando = true;
    //validamos que los campos sean correctos
    if(this.InputEmail.status == "VALID" && this.InputContrasena.status == "VALID"){
      //consumimos la api
      this.ObtenerServicio.PostRequest('api/login', 'Login', {
        //mandamos los parametros
        email:    this.InputEmail.value,
        password: this.InputContrasena.value,
      })
      //obtenemos la repuesta
      .subscribe((response: any)=>{
        //procesamos la respuesta
        this.Cargando = false;
        if(response.token != ""){
          //guardamos el token en una variable de sesion
          sessionStorage['Session'] = response.token;
          //redireccionamos
          this.route.navigate(['/Usuarios']); 
        }
        else{
          this.snackBar.open(response.error, '',{
            duration: 3000,          
          });
        }
        
      },
      () => { //Si ocurre un error al Llamar la API se ejecuta lo siguiente
        this.Cargando = false;
        this.snackBar.open('Usuario no encontrado', '',{
          duration: 3000,          
        });
      });
    }
    else{
      this.Cargando = false;
      this.snackBar.open('Es necesario ingresar Email y contraseña', '',{
        duration: 3000,
      });
    }
  }
}
