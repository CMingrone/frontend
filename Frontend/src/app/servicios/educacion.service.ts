import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../entidades/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  url : string = "https://mingroneback.onrender.com/educacion"
  constructor(private http:HttpClient) {
    console.log("El servicio de educacion esta corriendo");
   };

    obtenerDatosEducacion():Observable<Educacion[]>{
      return this.http.get<Educacion[]>(this.url);
    }
    editarEducacion(educacion:Educacion,id:number):Observable<any>{
      return this.http.put(this.url+"/"+id,educacion);
    }
    nuevaEducacion(educacion:Educacion):Observable<any>{
      return this.http.post(this.url,educacion);
    }
    eliminarEducacion(id:number){
      return  this.http.delete(this.url+"/"+id);
    }
}
