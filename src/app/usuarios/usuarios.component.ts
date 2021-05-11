import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { ServicioService } from '../servicio.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
export interface UsuarioElement {
  id:       number;
  imagen:   string;
}
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  Cargando: boolean = false;
  ObtenerServicio: any;
  Usuarios: any = [];
  Posts: any = [];
  InformacionUsuario: UsuarioElement = {
    id: 0,
    imagen: ""
  }
  InputNombre = new FormControl('', [
    Validators.required
  ]);
  InputApellido = new FormControl('', [
    Validators.required
  ]);
  InputEmail = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
  constructor(private snackBar: MatSnackBar,
              private http: HttpClient,) { 
    this.ObtenerServicio = new ServicioService(this.http);
  }

  ngOnInit(): void {
    this.TraerUsuarios();
  }
  CambiarInformacion(Id: number){
    if(this.InputEmail.status == "VALID" && this.InputNombre.status == "VALID" && this.InputApellido.status == "VALID"){
      let Posicion = this.Usuarios.findIndex((index:any) => 
        index.id === Id
      )
  
      this.Usuarios[Posicion].first_name = this.InputNombre.value;
      this.Usuarios[Posicion].last_name = this.InputApellido.value;
      this.Usuarios[Posicion].email = this.InputEmail.value;    
      this.snackBar.open('Se han guardado los cambios', '',{
        duration: 3000,
      });    
    }
    else{
      this.snackBar.open('Es necesario ingresar nombre, apellido y contraseña', '',{
        duration: 3000,
      });
    }
  }
  EliminarPost(Id: number){
    this.Posts.forEach( (element: any, index: number) => {
      if(element.id == Id) this.Posts.splice(index,1);
    });
  }
  SeleccionarUsuario(Id: number){
    this.Posts = [];
    let Usuario = this.Usuarios.find( (element: any) => element.id == Id );
    
    this.InformacionUsuario.id       = Usuario.id;
    this.InformacionUsuario.imagen   = Usuario.avatar;
    this.InputNombre.setValue(Usuario.first_name);
    this.InputApellido.setValue(Usuario.last_name);
    this.InputEmail.setValue(Usuario.email);

    //mostramos progressbar
    this.Cargando = true;
    //consumimos la api
    this.http.get<any>(environment.Posts+"posts?userId="+Id).subscribe({
      next: data => {
        this.Cargando = false;
        data.forEach((element: any) => {
          this.Posts.push(element);
        });                
      },
      error: error => {
        this.Cargando = false;
        return error;
      }
    });
  }
  TraerUsuarios(){
    //mostramos progressbar
    this.Cargando = true;
    //consumimos la api
    this.http.get<any>(environment.Login+"api/users").subscribe({
      next: data => {
        this.Cargando = false;
        data.data.forEach((element: any) => {
          this.Usuarios.push(element);
        });                
      },
      error: error => {
        this.Cargando = false;
        return error;
      }
    });
  }
}
