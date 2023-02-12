import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Educacion } from 'src/app/entidades/educacion';
import { Proyecto } from 'src/app/entidades/proyectos';
import { ProyectosService } from 'src/app/servicios/proyectos.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyectosList!:Proyecto[];
  usuarioAutenticado:boolean=false;
  idBack: number= 0;
  h:number=0;
  idFront:number=0;
  form:FormGroup;

  constructor(private servicioProyectos:ProyectosService, private login : LoginService,private miForm:FormBuilder) {
    this.form=this.miForm.group({
      empresa:['', [Validators.required]],
      titulo:['',[Validators.required]],
      descripcion:['',[Validators.required]],
      url:['',[Validators.required]],
      img:['',[Validators.required]]

    })
   }
   get empresa(){
    return this.form.get("empresa");
  }
  get titulo(){
    return this.form.get("titulo");
  }
  get descripcion(){
    return this.form.get("descripcion");
  }
  get url(){
    return this.form.get("url");
  }
  get img(){
    return this.form.get("img");
  }
  ngOnInit(): void {
    this.login.loginIn.subscribe(data=>{
      this.usuarioAutenticado=true;
  
    })

    this.login.loginOut.subscribe(data=>{
      this.usuarioAutenticado=false;
    })
    this.servicioProyectos.obtenerProyectos().subscribe(data=>{
      console.log(data);
      this.proyectosList=data;
    })
  }

  almacenarId(item:Proyecto){
    this.idBack= item.id;
    this.idFront=this.proyectosList.indexOf(item);
 
  }
  guardarDatos(){
    
    if(this.form.valid){

          let empresa=this.form.get('empresa')?.value;
          let titulo=this.form.get('titulo')?.value;
          let descripcion=this.form.get('descripcion')?.value;
          let url=this.form.get('url')?.value;
          let img=this.form.get('img')?.value;
          let idPersona=1;

          let proyectosEditar = new Proyecto(this.idBack,empresa,titulo,descripcion,url,img,idPersona);
          this.servicioProyectos.editarProyecto(proyectosEditar).subscribe({
              //modificar los datos del componente por los ingresados por el usuario
            next: (data) => {
              this.proyectosList[this.idFront]=proyectosEditar
              
              document.getElementById("cerrarModalProyectos")?.click();
              this.proyectosList[this.idFront]['id']=this.idBack;
              this.form.reset();
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
  mostrarDatos(unProyecto:Proyecto){
    this.idBack= unProyecto.id;
    this.idFront=this.proyectosList.indexOf(unProyecto);
      this.form.get('empresa')?.setValue(unProyecto.empresa);
      this.form.get('titulo')?.setValue(unProyecto.titulo);
      this.form.get('descripcion')?.setValue(unProyecto.descripcion);
      this.form.get('url')?.setValue(unProyecto.url);
      this.form.get('img')?.setValue(unProyecto.img);

  }

  eliminarProyecto(item:Proyecto)
  {
    if(confirm("¿Seguro que desea borrar el item?")){
    //alert(item.id);
    this.servicioProyectos.eliminarProyecto(item.id).subscribe(data=>{   
     // this.proyectosList.splice(this.idBack,1);
      console.log(this.proyectosList);
      this.ngOnInit();
    },  error => {
      alert("Se produjo  un error, consulte al   administrador");
    })
  }
}
  agregarProyecto(){
    let id=this.proyectosList.length+1;
    let empresa=this.form.get('empresa')?.value;
    let titulo=this.form.get('titulo')?.value;
    let descripcion=this.form.get('descripcion')?.value;
    let url=this.form.get('url')?.value;
    let img=this.form.get('img')?.value;
    let idPersona=1;

    let nuevoProyecto = new Proyecto(id,empresa,titulo,descripcion,url,img,idPersona);
    alert("agregar nuevo item"+id);
    this.servicioProyectos.nuevoProyecto(nuevoProyecto).subscribe(data => {
          this.proyectosList[id]=nuevoProyecto;
          this.form.reset();
          this.ngOnInit();
    });

    document.getElementById("cerrarModalProyectosNew")?.click();
   
  } 
  
}
