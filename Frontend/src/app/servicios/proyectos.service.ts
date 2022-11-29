import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../entidades/proyectos';


@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  url : string = "https://carlosmin.herokuapp.com/proyecto"
  constructor(private http:HttpClient) {
    console.log("El servicio de proyectos esta corriendo");
   };

    obtenerProyectos():Observable<Proyecto[]>{
      return this.http.get<Proyecto[]>(this.url);
    }
    editarProyecto(proyecto:Proyecto,id:number):Observable<any>{
      return this.http.put(this.url+"/"+id,proyecto);
    }
    nuevoProyecto(proyecto:Proyecto):Observable<any>{
      return this.http.post(this.url,proyecto);
    }
    eliminarProyecto(id:number){
      return  this.http.delete(this.url+"/"+id);
    }
}
