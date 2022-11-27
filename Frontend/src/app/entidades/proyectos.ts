export class Proyecto{
    id: number;
    empresa: string;
    titulo: string;
    descripcion: string;
    url: string;
    img: string;
    idPersona: number;

    constructor(id: number, empresa:string, titulo:string, descripcion:string, url:string, img:string, idPersona: number){

        this.id= id;
        this.empresa= empresa;
        this.titulo=titulo;
        this.descripcion=descripcion;
        this.url=url;
        this.img=img;
        this.idPersona= idPersona;
    }
    get getId(){
      return this.id;
    }
    get getEmpresa(){
        return this.empresa;
      }
    get getTitulo(){
        return this.titulo;
      }      
    get getDescripcion(){
        return this.descripcion;
      }
    get getUrl(){
        return this.url;
      }
    get getImg(){
        return this.img;
      }
    get getIdPersona(){
        return this.idPersona;
      }
}

