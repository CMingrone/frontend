import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Herramienta } from '../entidades/herramienta';

@Injectable({
  providedIn: 'root'
})
export class HerramientasService {
  url : string = "https://carlosmin.herokuapp.com/herramientas"
  constructor(private http:HttpClient) {
    console.log("El servicio de herramientas esta corriendo");
   }
   obtenerHerramientas():Observable<Herramienta[]>{
    return this.http.get<Herramienta[]>(this.url);
  }
  editarDatos(herramienta:Herramienta):Observable<any>{
    return this.http.put(this.url,herramienta);
  }
  nuevaHerramienta(herramienta:Herramienta):Observable<any>{
    return this.http.post(this.url,herramienta);
  }
  eliminarHerramienta(id:number){
    return  this.http.delete(this.url+"/"+id);
  }
}
