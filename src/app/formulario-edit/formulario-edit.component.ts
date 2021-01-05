import { Component, Input, OnInit } from '@angular/core';
import { Acto } from '../Acto';
import { ActoDatosService } from '../datos.service';
import { ActosDataService } from '../actos-data.service';
import { Datos } from './Datos';
import { Actor } from '../Actor';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Escribania } from '../Escribaniadatos';


@Component({
  selector: 'app-formulario-edit',
  templateUrl: './formulario-edit.component.html',
  styleUrls: ['./formulario-edit.component.scss']
})
export class FormularioEditComponent implements OnInit {
  //Lista de actos desde la API
  actos: Acto[] = [];
  // Actores desde la API
  listaActoresApi: Actor[]=[];
  // Escribania desde la API
  escribaniaDatosApi: Escribania[]=[];

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
    matricula: 0,
    folios: 0,
    valorGanancia: 0,
    valorIti: 0
  };
  
  // Acto seleccionado
  actoActual: Acto = {
    "id": 0,
    "codigo_acto": "",
    "nombre_acto": "",
    "p_sellos": 0,
    "p_honorarios": 0,
    "min_honorarios": 0,
    "p_aportes": 0,
    "min_aportes": 0,
    "p_ganancias": 0,
    "p_iti": 0
  };
  
  tieneSello : boolean = false;
  tieneGanancia : boolean = false;
  tieneIti: boolean = false;
  

  // Actores a actualizar en el service
  listaActores : Actor[]=[];

  constructor(private actoService: ActoDatosService,
    private actosDataService: ActosDataService) { 
  }

  ngOnInit(): void {
    this.actosDataService.getAllActos()
    .subscribe(actos =>this.actos = actos);
    console.log("Actos" +this.actos);
    this.actosDataService.getAllActores()
    .subscribe(actores =>this.listaActoresApi = actores);
    this.actosDataService.getDatosEscribania()
    .subscribe(escribania =>this.escribaniaDatosApi = escribania);
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

    event.target.value==0 ? this.tieneSello=false : this.tieneSello = true;
    console.log(this.tieneSello);
  }

  setGanancias(event: any) {

    event.target.value==0 ? this.tieneGanancia=false : this.tieneGanancia = true;
    console.log(this.tieneGanancia);
  }

  setIti(event: any) {

    event.target.value==0 ? this.tieneIti=false : this.tieneIti = true;
    console.log(this.tieneIti);
  }

  calcularSello() : void {
    if(this.tieneSello)
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
    this.datos.inscripcion = this.datos.valor*0.002+this.escribaniaDatosApi[0].gestor;
  }
  calcularAporte(){
    if(this.datos.valor*this.actoActual.p_aportes>this.actoActual.min_aportes)
      this.datos.aportes=this.datos.valor*this.actoActual.p_aportes;
    else
      this.datos.aportes= this.actoActual.min_aportes;
  }
  calcularRcd(): void{
    if(this.datos.valor*this.escribaniaDatosApi[0].p_rcd/100>this.escribaniaDatosApi[0].min_rcd)
      this.datos.rcd=this.datos.valor*this.escribaniaDatosApi[0].p_rcd/100;
    else
      this.datos.rcd=this.escribaniaDatosApi[0].min_rcd;
  }

  calcularGanancias() : void{
    if(this.tieneGanancia)
    this.datos.valorGanancia=this.datos.valor*this.actoActual.p_ganancias/100;
  }

  calcularIti() : void{
    if(this.tieneIti)
    this.datos.valorIti=this.datos.valor*this.actoActual.p_iti/100;
  }

  getPosActorById(id: number) : number{
    for(let i=0; i<this.listaActores.length;i++){
      if(this.listaActores[i].id==id)
      return i;
    }
    return 0;
  }

  calculcarTotalActor(actorId: number) : void{
    this.actoService.eliminarActores();
    let total =0;
    let id = this.getPosActorById(actorId);
    if(this.listaActores[id].sellos) total+=this.datos.valorSello/this.listaActores.length;
    if(this.listaActores[id].aporte) total+=this.datos.aportes/this.listaActores.length;
    if(this.listaActores[id].certificados) total+=this.datos.certificado;
    if(this.listaActores[id].municipal) total+=this.datos.municipal;
    if(this.listaActores[id].diligenciamiento) total+=this.datos.diligenciamiento;
    if(this.listaActores[id].rcd) total+=this.datos.rcd;
    if(this.listaActores[id].honorarios) total+=this.datos.honorarios;
    if(this.listaActores[id].iva) total+=this.datos.iva;
    if(this.listaActores[id].inscripcion) total+=this.datos.inscripcion;
    if(this.listaActores[id].matricula) total+=this.datos.matricula;
    if(this.listaActores[id].folios) total+=this.datos.folios;
    this.listaActores[id].total=total;

  }

  actualizarDatos(datos : Datos){
    this.actoService.actualizarDatos(datos);
  }
  calcular(){
    this.datos.matricula = this.escribaniaDatosApi[0].matricula;
    this.calcularSello(); // difiere x acto
    this.calcularGanancias(); // 3%
    this.calcularIti(); // 1.5%
    this.calcularHonorarios(); // difiere x acto
    this.calcularIva(); //siempre es el 21%
    this.calcularAporte(); // difiere x acto
    this.calcularRcd(); // lo configura la escribania
    this.calcularInscripcion(); // 
    this.calcularDiligenciamiento(); // lo configura la escribania esta en tabla
    this.actualizarDatos(this.datos);
    this.listaActores.forEach(actor => {
      this.calculcarTotalActor(actor.id);
    });
    this.actualizarActores();
    

  }


  actualizarActores(){
    this.listaActores.forEach(actor => {
      this.actoService.actualizarActores(actor);
    });
  }


  setActo(event: any){  
    console.log("SetActo metodo init")
    this.actoActual = this.getActoById(event.value);
    console.log(event.value);

    this.datos.nombreActo = this.actoActual.nombre_acto;
    console.log("nombre acto " + this.datos.nombreActo);
    this.datos.id_acto = this.actoActual.id;
    console.log("id acto "+this.datos.id_acto);
    
    this.setActores(this.datos.id_acto);
    console.log(this.listaActores[0].sellos)
  }
  
  setActores(idActo: number): void{
      this.listaActoresApi.forEach(actor => {
        if(actor.id_acto==idActo)
        this.listaActores.push(actor);
        console.log("tamaño de lista de actores "+this.listaActores.length)
      });
  }

  getActoById(id : any) : any{
   return this.actos.find(a => a.id==id);
  }
} 
