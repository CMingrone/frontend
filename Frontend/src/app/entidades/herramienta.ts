export class Herramienta{

    id: number;
    nombre: string;
    progreso: number;
    idPersona: number;

    constructor(id:number, nombre:string, progreso:number, idPersona:number){

      this.id= id;  
      this.nombre= nombre;
      this.progreso=progreso;
      this.idPersona= idPersona;
    }
    get getId(){
      return this.id;
    }
    get getNombre(){
        return this.nombre;
      }
    get getProgreso(){
        return this.progreso;
      }      
    get getIdPersona(){
        return this.idPersona;
      }
}

