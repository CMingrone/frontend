import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from 'src/app/entidades/login';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  login!:Login;
  validador!:any;
  usuarioAutenticado:boolean=false;
  form:FormGroup;

  constructor(private miServicio:LoginService, private miFormBuild:FormBuilder) {
    this.form=this.miFormBuild.group({
      usuario:['', [Validators.required, Validators.minLength(4)]],
      contrasenia:['',[Validators.required]],
    })
  }

  get usuario(){
    return this.form.get("usuario");
  }
  get contrasenia(){
    return this.form.get("contrasenia");
  }
 
  ngOnInit(): void {
  }


validarLogin(){
    
 if(this.form.valid){

       
        let usuario=this.form.get('usuario')?.value;
        let contrasenia=this.form.get('contrasenia')?.value;

        let loginIn = new Login(1,usuario,contrasenia,1);

          this.miServicio.validarLogin(loginIn).subscribe({
              
            next: (data) => {
              console.log(data);
              if(data==true){
                
                  this.validador=data;
                  this.usuarioAutenticado=true;
                  this.miServicio.loginIn.emit({data:this.validador});
                  document.getElementById("cerrarModalLogin")?.click();
                  this.form.reset();
              }else{
                alert('Los datos ingresados son incorrectos');
                document.getElementById("cerrarModalLogin")?.click();
                this.form.reset();
              }
              
            }, 
            error: (error) => {
              
           
            }
          });
        
          
    }
    else{
          alert('Hay errores');
          this.form.markAllAsTouched()
    }
  }

    loginOut(){
      this.usuarioAutenticado=false;
      this.miServicio.loginOut.emit({data:this.usuarioAutenticado});
    }
  
  
  }