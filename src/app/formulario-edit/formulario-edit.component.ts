import { Component, Input, OnInit } from '@angular/core';
import { ActoDatosService } from '../acto-datos.service';
import { Datos } from './Datos';


@Component({
  selector: 'app-formulario-edit',
  templateUrl: './formulario-edit.component.html',
  styleUrls: ['./formulario-edit.component.scss']
})
export class FormularioEditComponent implements OnInit {

  datos : Datos  = {
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
  
  tieneSello : boolean = false;
  min_valor : number;
  total : number = 0;
  gestor : number = 5500;

  constructor(private actoDatosService: ActoDatosService) { 
    this.min_valor = 150;
  }

  ngOnInit(): void {
  }

  setValor(event: any) {
    this.datos.valor= event.target.value;
    console.log("Valor: "+this.datos.valor);
  }

  setCertificados(event: any) {
    this.datos.certificado= event.target.value*1000;
    console.log("Certificados: " + this.datos.certificado);
  }

  setFolios(event: any) {
    this.datos.folios= (event.target.value*2+2)*650;
    console.log("Folios: "+this.datos.folios);
  }


  setSello(event: any) {
    this.tieneSello= event.target.value;
  }

  calcularSello() : void {
    if(this.tieneSello)
      this.datos.valorSello=this.datos.valor*2/100;
  }

  calcularHonorarios(): void{
    if(this.datos.valor*2/100>21000)
    this.datos.honorarios= this.datos.valor*2/100;
    else
    this.datos.honorarios=21000;
  }

  calcularIva(): void{
    this.datos.iva= this.datos.honorarios*21/100;
  }

  calcularDirigenciamiento() : void{
    if(this.datos.valor<298116)
      this.datos.dirigenciamiento=4175;
    else{
      let excedente: number = this.datos.valor-298116;
      this.datos.dirigenciamiento=(excedente/1000)*2+4175;
    }
  }

  calcularInscripcion(): void {
    this.datos.inscripcion = this.datos.valor*0.002+this.gestor;
  }
  calcularAporte(){
    this.datos.aportes=this.datos.valor*0.008;
  }
  calcularRDC(): void{
    if(this.datos.valor*1/100>12096)
      this.datos.rcd=this.datos.valor*1/100;
    else
      this.datos.rcd=12096;
  }

  actualizarDatos(datos : Datos){
    this.actoDatosService.actualizar(datos);
  }
  calcular(){
    this.total=0;
    this.calcularSello();
    this.calcularHonorarios();
    this.calcularIva();
    this.calcularAporte();
    this.calcularRDC();
    this.calcularInscripcion();
    this.calcularDirigenciamiento();
    
    this.actualizarDatos(this.datos);
    this.total=
    this.datos.valorSello+
    this.datos.honorarios+
    this.datos.aportes+
    this.datos.iva+
    this.datos.certificado+
    this.datos.municipal+
    this.datos.dirigenciamiento+
    this.datos.rcd+
    this.datos.inscripcion+
    this.datos.matricula+
    this.datos.folios+
    this.datos.aportes;

  }
}
