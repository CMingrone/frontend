import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../entidades/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  url : string = "https://carlosmin.herokuapp.com/experiencia"
  constructor(private http:HttpClient) {
    console.log("El servicio de educacion esta corriendo");
   };

    obtenerExperiencia():Observable<Experiencia[]>{
      return this.http.get<Experiencia[]>(this.url);
    }
    editarExperiencia(experiencia:Experiencia,id:number):Observable<any>{
      return this.http.put(this.url+"/"+id,experiencia);
    }
    nuevaExperiencia(experiencia:Experiencia):Observable<any>{
      return this.http.post(this.url,experiencia);
    }
    eliminarExperiencia(id:number){
      return  this.http.delete(this.url+"/"+id);
    }

}
