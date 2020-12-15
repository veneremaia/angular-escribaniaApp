import { Component, Input, OnInit } from '@angular/core';
import { Acto } from '../Acto';
import { ActoDatosService } from '../datos.service';
import { ActosDataService } from '../actos-data.service';
import { Datos } from './Datos';
import { Actor } from '../Actor';


@Component({
  selector: 'app-formulario-edit',
  templateUrl: './formulario-edit.component.html',
  styleUrls: ['./formulario-edit.component.scss']
})
export class FormularioEditComponent implements OnInit {
  //Lista de actos desde la API
  actos: Acto[] = [];
  // Dato final que mostraremos en resultados
  datos : Datos  = {
    nombreCliente: '',
    nombreActo: '',
    id_acto : 0,
    valor: 0,
    valorSello: 0,
    honorarios: 0,
    aportes: 0,
    iva: 0,
    certificado: 0,
    municipal: 1000,
    diligenciamiento: 0,
    rcd: 0,
    inscripcion: 0,
    matricula: 3500,
    folios: 0
  };
  
  
  tieneSello : boolean = false;

  gestor : number = 5500;
  actoActual: Acto = {
    "id": 0,
    "codigo_acto": "",
    "nombre_acto": "",
    "p_sellos": 0,
    "p_honorarios": 0,
    "min_honorarios": 0,
    "p_aportes": 0,
    "min_aportes": 0
  };
  datosActores: Actor[]=[];

  constructor(private actoService: ActoDatosService,
    private actosDataService: ActosDataService) { 
  }

  ngOnInit(): void {
    this.actosDataService.getAllActos()
    .subscribe(actos =>this.actos = actos);
    console.log("Actos" +this.actos);
    this.actosDataService.getAllActores()
    .subscribe(actores =>this.datosActores = actores);
  }

  setValor(event: any) {
    this.datos.valor= event.target.value;
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
    console.log("tiene sello");
      this.datos.valorSello=this.datos.valor*this.actoActual.p_sellos/100;
      console.log(this.datos.valor);
      console.log(this.actoActual.p_sellos);

  }

  calcularHonorarios(): void{
    if(this.datos.valor*this.actoActual.p_honorarios/100>this.actoActual.min_honorarios)
    this.datos.honorarios= this.datos.valor*this.actoActual.p_honorarios/100;
    else
    this.datos.honorarios=this.actoActual.min_honorarios;
  }

  calcularIva(): void{
    this.datos.iva= this.datos.honorarios*21/100;
  }

  calcularDiligenciamiento() : void{
    if(this.datos.valor<298116)
      this.datos.diligenciamiento=4175;
    else{
      let excedente: number = this.datos.valor-298116;
      this.datos.diligenciamiento=(excedente/1000)*2+4175;
    }
  }

  calcularInscripcion(): void {
    this.datos.inscripcion = this.datos.valor*0.002+this.gestor;
  }
  calcularAporte(){
    if(this.datos.valor*this.actoActual.p_aportes>this.actoActual.min_aportes)
      this.datos.aportes=this.datos.valor*this.actoActual.p_aportes;
    else
      this.datos.aportes= this.actoActual.min_aportes;
  }
  calcularRcd(): void{
    if(this.datos.valor*1/100>12096)
      this.datos.rcd=this.datos.valor*1/100;
    else
      this.datos.rcd=12096;
  }

  calculcarPrecioActor(actor: Actor) : void{
    let total =0;
    if(actor.sellos) total+=this.datos.valorSello;
  }

  actualizarDatos(datos : Datos){
    this.actoService.actualizarDatos(datos);
  }
  calcular(){
    this.calcularSello(); // difiere x acto
    this.calcularHonorarios(); // difiere x acto
    this.calcularIva(); //siempre es el 21%
    this.calcularAporte(); // difiere x acto
    this.calcularRcd(); // lo configura la escribania
    this.calcularInscripcion(); // 
    this.calcularDiligenciamiento(); // lo configura la escribania esta en tabla
    this.actualizarDatos(this.datos);

  }




  setActo(event: any){  
    this.actoActual = this.getActoById(event.value);
    this.datos.nombreActo = event.nombre_acto;
    console.log("Este es el acto " +this.actoActual.codigo_acto);
  }
  

  getActoById(id : any) : any{
   return this.actos.find(a => a.id==id);
  }
} 
