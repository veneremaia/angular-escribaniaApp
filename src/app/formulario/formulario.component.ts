import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, Input, OnInit } from '@angular/core';
import { Datos } from '../formulario-edit/Datos';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  @Input()
  datosFinales : Datos  = {
    nombreCliente: 'Bitter Call Saul',
    valor: 0,
    valorSello: 0,
    honorarios: 0,
    aportes: 0,
    iva: 0,
    certificado: 0,
    municipal: 1000,
    dirigenciamiento: 0,
    rcd: 0,
    inscripcion: 0,
    matricula: 3500,
    folios: 0
  };
  
  constructor() { 
  }

  ngOnInit(): void {
  }

 
}
