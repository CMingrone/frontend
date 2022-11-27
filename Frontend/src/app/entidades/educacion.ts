export class Educacion{
    id: number;
    school: string;
    title: string;
    start: number;
    end: number;
    img:string;
    idPersona: number;

    constructor(id:number,school:string, title:string, start:number, end:number, img:string, idPersona: number){
      
        this.id= id;
        this.school= school;
        this.title=title;
        this.start=start;
        this.end=end;
        this.img=img;
        this.idPersona= idPersona;
    }

    get getId(){
      return this.id;
    }
    get getschool(){
        return this.school;
      }
    get getPisition(){
        return this.title;
      }      
    get getstart(){
        return this.start;
      }
    get getend(){
        return this.end;
      }
    get getImg(){
        return this.img;
      }
    get getIdPersona(){
        return this.idPersona;
      }
}

