import { Component, OnInit } from '@angular/core';
import { HerramientasService } from 'src/app/servicios/herramientas.service';
import { CargarScriptsService } from 'src/app/servicios/cargar-scripts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Herramienta } from 'src/app/entidades/herramienta';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-herramientas',
  templateUrl: './herramientas.component.html',
  styleUrls: ['./herramientas.component.css']
})
export class HerramientasComponent implements OnInit {

  herramientasList!:Herramienta[];
  usuarioAutenticado:boolean=false;
  form:FormGroup;
  idBack: number= 0;
  h:number=0;
  idFront:number=0;
  
  constructor(private servicioDeHerramientas:HerramientasService, private login : LoginService, private miForm:FormBuilder) { 
    this.form=this.miForm.group({
      nombre:['', [Validators.required]],
      progreso:['',[Validators.required]]


    }) 
  
  }
    get nombre(){
      return this.form.get("nombre");
    }
    get progreso(){
      return this.form.get("progreso");
    }
 

  ngOnInit(): void {
    this.login.loginIn.subscribe(data=>{
      this.usuarioAutenticado=true;
  
    })

    this.login.loginOut.subscribe(data=>{
      this.usuarioAutenticado=false;
    })
    this.servicioDeHerramientas.obtenerHerramientas().subscribe(data=>{
      console.log(data);
      this.herramientasList=data;
      
    })
  }

  almacenarId(item:Herramienta){
    this.idBack= item.id;
    this.idFront=this.herramientasList.indexOf(item);
 
  }
  guardarDatos(){
    
    if(this.form.valid){

          let nombre=this.form.get('nombre')?.value;
          let progreso=this.form.get('progreso')?.value;
          let idPersona=1;

          let herramientasEditar = new Herramienta(this.idBack,nombre,progreso,idPersona);
          console.log(herramientasEditar)
          console.log("pasa por aca")

          this.servicioDeHerramientas.editarDatos(herramientasEditar).subscribe({
              
            next: (data) => {
              this.herramientasList[this.idFront]=herramientasEditar
              this.form.reset();
              document.getElementById("cerrarModalHerramientas")?.click();
              
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
  mostrarDatos(item:any){
    this.idBack= item.id;
    this.idFront=this.herramientasList.indexOf(item);
      this.form.get('nombre')?.setValue(item.nombre);
      this.form.get('progreso')?.setValue(item.progreso);
      this.almacenarId(item);
  }

  eliminarHerramienta(item:Herramienta)
  {
    if(confirm("¿Seguro que desea borrar el item?")){
    //alert(item.id);
    this.servicioDeHerramientas.eliminarHerramienta(item.id).subscribe(data=>{   
     // this.herramientasList.splice(this.idBack,1);
      console.log(this.herramientasList);
      this.ngOnInit();
    },  error => {
      alert("Se produjo  un error, consulte al   administrador");
    })
  }
}
  agregarHerramienta(){
    let id=this.herramientasList.length+1;
    let nombre=this.form.get('nombre')?.value;
    let progreso=this.form.get('progreso')?.value;
    let idPersona=1;

    let nuevaHerramienta = new Herramienta(id,nombre,progreso,idPersona);
    alert("agregar nuevo item"+id);
    this.servicioDeHerramientas.nuevaHerramienta(nuevaHerramienta).subscribe(data => {
   

    this.herramientasList[id]=nuevaHerramienta;
    this.form.reset();
    this.ngOnInit(); 
  });
    document.getElementById("cerrarModalHerramientaNueva")?.click(); 
   
    
  }
}
