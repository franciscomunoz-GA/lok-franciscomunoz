import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BrowserStack } from 'protractor/built/driverProviders';
import { environment } from './../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient) { }
  
  // Consumir WS o API REST por POST
  public PostRequest(endPoint: string, Tipo: string, data: any){
    // Ruta para consumir WS o API REST
    let serverName: string = "";
    switch (Tipo) {
      case 'APIPASS':            
        // serverName = environment.APIPASS;
        break;
      case 'Login':
        serverName = environment.Login;
    }
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');    
    headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    headers.append('Accept','application/json');
    headers.set('Content-Type', 'application/json; charset=utf-8');
    let body = new HttpParams();
    for(let key in data){
      if(typeof data[key] !== 'function'){
        body = body.set(key, data[key]);
      }
    }
    return this.http.post((serverName + endPoint), body, { headers: headers });
  }
}
