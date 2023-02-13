import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarjeta-circulo',
  templateUrl: './tarjeta-circulo.component.html',
  styleUrls: ['./tarjeta-circulo.component.css']
})
export class TarjetaCirculoComponent implements OnInit {

  @Input() progreso! : number
  @Input() nombre! : string

  constructor() { }

  ngOnInit(): void {
  }

}
