export class Experiencia{
    id : number;
    empresa: string;
    puesto: string;
    tareas: string;
    tipo:string;
    start: string;
    end: string;
    img: string;
    idPersona : number;

    constructor(id:number, empresa:string, puesto:string, tareas:string, tipo:string, start:string, end:string, img:string, idPersona: number){

        this.id= id;
        this.empresa= empresa;
        this.puesto= puesto;
        this.tareas=tareas;
        this.tipo=tipo;
        this.start=start;
        this.end=end;
        this.img=img;
        this.idPersona= idPersona;
    }

    get getId(){
      return this.id;
    }
    get getEmpresa(){
        return this.empresa;
      }
    get getPuesto(){
        return this.puesto;
      }
    get getTareas(){
        return this.tareas;
      }      
    get getTipo(){
        return this.tipo;
      }
    get getStart(){
        return this.start;
      }
    get getEnd(){
        return this.end;
      }
    get getImg(){
        return this.img;
      }
    get getIdPersona(){
        return this.idPersona;
      }
}
