import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AcercaDe } from '../entidades/acercaDe';

@Injectable({
  providedIn: 'root'
})
export class AcercaDeService {
  url : string = "https://mingroneback.onrender.com/acercaDe"
  constructor(private http:HttpClient) {
    console.log("El servicio acercaDe esta corriendo");
   }
   obtenerDatos(id:number):Observable<any>{
    return this.http.get<AcercaDe>(this.url+"/"+id);
  }
  editarDatos(comentario:AcercaDe):Observable<any>{
    return this.http.put(this.url,comentario);
  }
}
