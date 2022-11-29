import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Educacion } from 'src/app/entidades/educacion';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educacionList!:Educacion[];
  idBack: number= 0;
  h:number=0;
  idFront:number=0;
  usuarioAutenticado:boolean=false;
  form:FormGroup;

  constructor(private servicioEducacion:EducacionService,private login : LoginService, private miForm:FormBuilder) {
    this.form=this.miForm.group({
      school:['', [Validators.required]],
      title:['',[Validators.required]],
      start:['',[Validators.required]],
      end:['',[Validators.required]],
      img:['',[Validators.required]]

    })
   }
   get id(){
    return this.form.get("id");
   }
   get school(){
    return this.form.get("school");
  }
  get title(){
    return this.form.get("title");
  }
  get start(){
    return this.form.get("start");
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


    this.servicioEducacion.obtenerDatosEducacion().subscribe(data=>{

      this.educacionList=data;

      console.log(this.educacionList);

      
    })
  }
  
  almacenarId(item:Educacion){
    this.idBack= item.id;
    this.idFront=this.educacionList.indexOf(item);
 
  }

  guardarDatos(){
          console.log(this.idBack);
    if(this.form.valid){

          
          let school=this.form.get('school')?.value;
          let title=this.form.get('title')?.value;
          let start=this.form.get('start')?.value;
          let end=this.form.get('end')?.value;
          let img=this.form.get('img')?.value;
          let idPersona=1;
          console.log(school);

          let educacionEditar = new Educacion(this.idBack,school,title,start,end,img,idPersona);

          this.servicioEducacion.editarEducacion(educacionEditar,this.idBack).subscribe({
              //modificar los datos del componente por los ingresados por el usuario
            next: (data) => {
              this.educacionList[this.idFront]=educacionEditar;
              this.form.reset();
             document.getElementById("cerrarModalEducacion")?.click();
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


  mostrarDatos(item:Educacion){

    this.idBack= item.id;
    this.idFront=this.educacionList.indexOf(item);
      console.log(this.idFront);
      console.log(this.idBack);

      this.form.get('school')?.setValue(item.school);
      this.form.get('title')?.setValue(item.title);
      this.form.get('start')?.setValue(item.start);
      this.form.get('end')?.setValue(item.end);
      this.form.get('img')?.setValue(item.img);
      this.almacenarId(item);

  }
  eliminarEducacion(item:Educacion)
  {
    if(confirm("¿Seguro que desea borrar el item?")){
    //alert(item.id);
    this.servicioEducacion.eliminarEducacion(item.id).subscribe(data=>{   
     // this.educacionList.splice(this.idBack,1);
      console.log(this.educacionList);
      this.ngOnInit();
    },  error => {
      alert("Se produjo  un error, consulte al   administrador");
    })
  }
}

  
  agregarEducacion(){
    let id=this.educacionList.length+1;
    let school=this.form.get('school')?.value;
    let title=this.form.get('title')?.value;
    let start=this.form.get('start')?.value;
    let end=this.form.get('end')?.value;
    let img=this.form.get('img')?.value;
    let idPersona=1;

    let nuevaEducacion = new Educacion(id,school,title,start,end,img,idPersona);
    alert("agregar nuevo item"+id);
    this.servicioEducacion.nuevaEducacion(nuevaEducacion).subscribe(data => {
        this.educacionList[id]=nuevaEducacion;
        this.form.reset();
        this.ngOnInit();
        
    });
    document.getElementById("cerrarModalEducacionNew")?.click();

    
    
  }

}

