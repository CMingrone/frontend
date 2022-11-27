import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../entidades/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

@Output() loginIn: EventEmitter<any> = new EventEmitter();
@Output() loginOut: EventEmitter<any> = new EventEmitter();

url : string = "http://localhost:8080/login"

  constructor(private http:HttpClient) {
    console.log("El servicio de login esta corriendo");
   }

   validarLogin(login:Login):Observable<any>{
     return this.http.post(this.url,login);
   }
   
   
}
