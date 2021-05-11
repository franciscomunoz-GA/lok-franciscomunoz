import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-usuarios-album',
  templateUrl: './usuarios-album.component.html',
  styleUrls: ['./usuarios-album.component.scss']
})
export class UsuariosAlbumComponent implements OnInit {
  Cargando: boolean = false;
  ObtenerServicio: any;
  Usuarios: any = [];
  IdUsuario: number = 0;
  
  constructor(private snackBar: MatSnackBar,
              private http: HttpClient,
              public route: Router,) { 
    this.ObtenerServicio = new ServicioService(this.http);    
  }

  ngOnInit(): void {
    this.TraerUsuarios();
  }
  SeleccionarUsuario(Usuario: any){
    this.route.navigate(['/Album',JSON.stringify(Usuario)]); 
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
