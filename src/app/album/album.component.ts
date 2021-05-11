import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  private Parametro: any;
  Cargando: boolean = false;
  ObtenerServicio: any;
  Usuario: any;
  Albums: any = [];
  constructor(private http: HttpClient,
    private route: ActivatedRoute) { 
      this.ObtenerServicio = new ServicioService(this.http);
    this.Parametro = this.route.params.subscribe((params:any) => {
      if(params.Usuario){
        this.Usuario = JSON.parse(params['Usuario']);                
      }
    })
    }

  ngOnInit(): void {
    this.TraerAlbums()
  }
  TraerAlbums(){
    //mostramos progressbar
    this.Cargando = true;
    //consumimos la api
    this.http.get<any>(environment.Posts+"users/"+this.Usuario.id+"/albums").subscribe({
      next: data => {
        this.Cargando = false;
        data.forEach((element: any) => {
          this.Albums.push(element);
        });                
      },
      error: error => {
        this.Cargando = false;
        return error;
      }
    });
  }
}
