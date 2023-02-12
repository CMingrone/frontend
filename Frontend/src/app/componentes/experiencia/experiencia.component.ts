import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experiencia } from 'src/app/entidades/experiencia';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  experienciaList!:Experiencia[];
  usuarioAutenticado:boolean=false;
  form:FormGroup;
  idBack: number= 0;
  h:number=0;
  idFront:number=0;

  constructor(private servicioExperiencia:ExperienciaService,private login : LoginService, private miForm:FormBuilder) {
    this.form=this.miForm.group({
      empresa:['', [Validators.required]],
      puesto:['',[Validators.required]],
      tareas:['',[Validators.required]],
      tipo:['',[Validators.required]],
      start:['',[Validators.required]],
      end:['',[Validators.required]],
      img:['',[Validators.required]]

    })
   }
   get empresa(){
    return this.form.get("empresa");
  }
  get puesto(){
    return this.form.get("puesto");
  }
  get tareas(){
    return this.form.get("tareas");
  }
  get tipo(){
    return this.form.get("tipo");
  }
  get end(){
    return this.form.get("end");
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
    this.servicioExperiencia.obtenerExperiencia().subscribe(data=>{
      console.log(data);
      this.experienciaList=data;
    })
  }

  almacenarId(item:Experiencia){
    this.idBack= item.id;
    this.idFront=this.experienciaList.indexOf(item);
 
  }
  guardarDatos(){
    
    if(this.form.valid){

          let empresa=this.form.get('empresa')?.value;
          let puesto=this.form.get('puesto')?.value;
          let tareas=this.form.get('tareas')?.value;
          let tipo=this.form.get('tipo')?.value;
          let start=this.form.get('start')?.value;
          let end=this.form.get('end')?.value;
          let img=this.form.get('img')?.value;
          let idPersona=1;

          let experienciaEditar = new Experiencia(this.idBack,empresa,puesto,tareas,tipo,start,end,img,idPersona);
          this.servicioExperiencia.editarExperiencia(experienciaEditar).subscribe({
              //modificar los datos del componente por los ingresados por el usuario
            next: (data) => {
              this.experienciaList[this.idFront]=experienciaEditar
              
              document.getElementById("cerrarModalExperiencia")?.click();
              //this.experienciaList[this.idFront]['id']=this.idBack;
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
  mostrarDatos(unaExperiencia:any){
    this.idBack= unaExperiencia.id;
    this.idFront=this.experienciaList.indexOf(unaExperiencia);
      this.form.get('empresa')?.setValue(unaExperiencia.empresa);
      this.form.get('puesto')?.setValue(unaExperiencia.puesto);
      this.form.get('tareas')?.setValue(unaExperiencia.tareas);
      this.form.get('tipo')?.setValue(unaExperiencia.tipo);
      this.form.get('start')?.setValue(unaExperiencia.start);
      this.form.get('end')?.setValue(unaExperiencia.end);
      this.form.get('img')?.setValue(unaExperiencia.img);

  }
  eliminarExperiencia(item:Experiencia)
  {
    if(confirm("¿Seguro que desea borrar el item?")){
    //alert(item.id);
    this.servicioExperiencia.eliminarExperiencia(item.id).subscribe(data=>{   
     // this.educacionList.splice(this.idBack,1);
      console.log(this.experienciaList);
      this.ngOnInit();
    },  error => {
      alert("Se produjo  un error, consulte al   administrador");
    })
  }
  }
  agregarExperiencia(){
    let id=this.experienciaList.length+1;
    let empresa=this.form.get('empresa')?.value;
    let puesto=this.form.get('puesto')?.value;
    let tareas=this.form.get('tareas')?.value;
    let tipo=this.form.get('tipo')?.value;
    let start=this.form.get('start')?.value;
    let end=this.form.get('end')?.value;
    let img=this.form.get('img')?.value;
    let idPersona=1;

    let nuevaExperiencia = new Experiencia(id,empresa,puesto,tareas,tipo,start,end,img,idPersona);
    alert("agregar nuevo item"+id);
    this.servicioExperiencia.nuevaExperiencia(nuevaExperiencia).subscribe(data => {

    this.experienciaList[id]=nuevaExperiencia;
    this.form.reset();
    this.ngOnInit();
    
    });
    
    document.getElementById("cerrarModalExperienciaNew")?.click();
    
  }

}
