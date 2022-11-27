export class Login{
    id: number;
    usuario: string;
    contrasenia: string;
    idPersona: number;

    constructor(id: number, usuario: string, contrasenia:string, idPersona: number){

        this.id= id;
        this.usuario= usuario;
        this.contrasenia= contrasenia;
        this.idPersona= idPersona;
    }

    get getId(){
        return this.id;
      }
      get getUsuario(){
        return this.usuario;
      }
      get getContrasenia(){
        return this.contrasenia;
      }
    get getIdPersona(){
        return this.idPersona;
      }

}
