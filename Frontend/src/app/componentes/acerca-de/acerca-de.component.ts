import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AcercaDe } from 'src/app/entidades/acercaDe';
import { AcercaDeService } from 'src/app/servicios/acerca-de.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
 
  acercaDe!:AcercaDe;
  usuarioAutenticado:boolean=false;
  form:FormGroup;

  constructor(private servicioAcercaDe:AcercaDeService, private login : LoginService,private miForm: FormBuilder) { 
    this.form=this.miForm.group({
      comentario:['', [Validators.required, Validators.minLength(30)]]
    } )
}

get comentario(){
  return this.form.get("comentario");
}

ngOnInit(): void {
  this.login.loginIn.subscribe(data=>{
    this.usuarioAutenticado=true;
  })
  this.login.loginOut.subscribe(data=>{
    this.usuarioAutenticado=false;
  })
  this.servicioAcercaDe.obtenerDatos(1).subscribe(data => {
    console.log(data);
    this.acercaDe=data;
  })

}
guardarDatos(){
    
  if(this.form.valid){

        let comentario=this.form.get('comentario')?.value;
        let idPersona=1;
        
        let comentarioEditar = new AcercaDe(this.acercaDe.id,comentario,idPersona);
        this.servicioAcercaDe.editarDatos(comentarioEditar).subscribe({
            //modificar los datos del componente por los ingresados por el usuario
          next: (data) => {
            this.acercaDe=comentarioEditar
            this.form.reset();
            document.getElementById("cerrarModalAcercaDe")?.click();
          }, 
          error: (error) => {
            alert('No se puedo actualizar el registro. Por favor intente nuevamente mas tarde');
         
          }
        });
      
        
  }
  else{
        alert('Hay errores');
        this.form.markAllAsTouched()
  }
}
mostrarDatosActuales(){
  this.form.get('comentario')?.setValue(this.acercaDe.comentario);
}

}
