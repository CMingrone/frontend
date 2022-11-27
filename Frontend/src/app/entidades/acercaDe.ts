export class AcercaDe{
    id: number;
    comentario: string;
    idPersona: number;

    constructor(id: number, comentario:string, idPersona: number){

        this.id= id;
        this.comentario= comentario;
        this.idPersona= idPersona;
    }

    get getId(){
        return this.id;
      }
      get getComentario(){
        return this.comentario;
      }
    get getIdPersona(){
        return this.idPersona;
      }

}
