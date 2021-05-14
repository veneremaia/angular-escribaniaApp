import { Component, Input, OnInit } from '@angular/core';
import { Acto } from '../Acto';
import { ActoDatosService } from '../datos.service';
import { ActosDataService } from '../actos-data.service';
import { Datos } from './Datos';
import { Actor } from '../Actor';
import { Escribania } from '../Escribaniadatos';
import { Escala } from '../Escala';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-formulario-edit',
  templateUrl: './formulario-edit.component.html',
  styleUrls: ['./formulario-edit.component.scss']
})
export class FormularioEditComponent implements OnInit {

  today : Date = new Date();
  fechaActual : String = "";
  //Lista de actos desde la API
  actosApi: Acto[] = [];
  // Actores desde la API
  listaActoresApi: Actor[]=[];
  // Escribania desde la API
  escribaniaDatosApi: Escribania[]=[];
  // Datos escala porcentual API
  escalaPorcentualApi : Escala[]=[];

  formCalculador = new FormGroup({
    acto : new FormControl('', Validators.required),
    valor : new FormControl('', Validators.required),
    certificados : new FormControl('', Validators.required),
    municipal : new FormControl('', Validators.required),
    folios : new FormControl('', Validators.required),
    sellos : new FormControl('', Validators.required),
    ganancias : new FormControl('', Validators.required),
    iti : new FormControl('', Validators.required),
    nombreCliente : new FormControl('', Validators.required),

  });

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
    municipal: 0,
    diligenciamiento: 0,
    rcd: 0,
    inscripcion: 0,
    matricula: 0,
    folios: 0,
    valorGanancia: 0,
    valorIti: 0, 
    total: 0
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
  cantFolios : number = 0;
  cantCertificados : number = 0;
  cantMunicipal : number = 0;
  

  // Actores a actualizar en el service
  listaActores : Actor[]=[];
  // isShowed a actualizar en el service
  isShowed : boolean = false;
  // isPrinted a actualizar en el service
  isPrinted : boolean = false;

  constructor(private actoService: ActoDatosService,
    private actosDataService: ActosDataService) { 
      var dd = String(this.today.getDate()).padStart(2, '0');
      var mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = this.today.getFullYear();
      this.fechaActual = dd + '/' + mm + '/' + yyyy;
  }

  ngOnInit(): void {
    // traigo todos los actos de la api
    this.actosDataService.getAllActos()
    .subscribe(actos =>this.actosApi = actos);
    // traigo la escala porcentual de la api
    this.actosDataService.getAllEscalas()
    .subscribe(escala =>this.escalaPorcentualApi = escala);
    // traigo todos los actores de la api
    this.actosDataService.getAllActores()
    .subscribe(actores =>this.listaActoresApi = actores);
    // traigo los datos de la escribania de la api
    this.actosDataService.getDatosEscribania()
    .subscribe(escribania =>this.escribaniaDatosApi = escribania);
    // traigo el dato de si se esta mostrando o consultando
    this.actoService.isShowed.subscribe(b =>this.isShowed=b);
    // traigo el dato de si se esta en modo imprimir
    this.actoService.isPrinted.subscribe(b =>this.isPrinted=b);
  }

  goToForm() : void{
    this.isPrinted = false;
    this.actoService.actualizarIsPrinted(this.isPrinted);
  }


  setCertificados(value : string) {
    this.cantCertificados = Number(value);
    this.datos.certificado = 0;
    this.datos.certificado= this.cantCertificados*this.escribaniaDatosApi[0].certificado;
    console.log("Certificados: " + this.datos.certificado);
  }
 

  setCertificadosMunicipal(value : string) {
    this.datos.municipal = 0;
    this.cantMunicipal = Number(value);
    this.datos.municipal = this.cantMunicipal*this.escribaniaDatosApi[0].imp_municipal;
  }

  setFolios(value : string) {
    this.cantFolios = Number(value);
    this.datos.folios= (this.cantFolios*2+2)*this.escribaniaDatosApi[0].folio;
    console.log("Folios: "+this.datos.folios);
  }



  calcularSello() : void {
    this.datos.valorSello = 0;
    if(this.tieneSello)
      this.datos.valorSello=this.datos.valor*this.actoActual.p_sellos/100;
    console.log(this.datos.valor);
    console.log(this.actoActual.p_sellos);

  }

  calcularHonorarios(): void{
    this.datos.honorarios = 0;
    if(this.actoActual.p_honorarios>0){
      // Si el valor de escritura es menor o igual al minimo puesto por la escala porcentual de honorarios
      if(this.datos.valor<=this.escribaniaDatosApi[0].min_valor_escritura_he)
        this.datos.honorarios = this.escribaniaDatosApi[0].min_valor_honorario_escala;
      else{
        let excedente = this.datos.valor - this.escribaniaDatosApi[0].min_valor_escritura_he;
        this.datos.honorarios = this.escribaniaDatosApi[0].min_valor_escritura_he + (excedente*this.escribaniaDatosApi[0].p_honorario_escala_exedente);
      }


    }
    else{

    if(this.datos.valor*this.actoActual.p_honorarios/100>this.actoActual.min_honorarios)
    this.datos.honorarios= this.datos.valor*this.actoActual.p_honorarios/100;
    else
    this.datos.honorarios=this.actoActual.min_honorarios;
    }
  }

  calcularIva(): void{
    this.datos.iva= this.datos.honorarios*21/100;
  }

  calcularDiligenciamiento() : void{
    if(this.datos.valor<this.escribaniaDatosApi[0].min_valor_diligenciamiento)
      this.datos.diligenciamiento=this.escribaniaDatosApi[0].min_diligenciamiento;
    else{
      let excedente: number = this.datos.valor-this.escribaniaDatosApi[0].min_valor_diligenciamiento;
      this.datos.diligenciamiento=(excedente/1000)*2+this.escribaniaDatosApi[0].min_diligenciamiento;
    }
  }

  calcularInscripcion(): void {
    this.datos.inscripcion = this.datos.valor*0.002+this.escribaniaDatosApi[0].gestor;
  }

calcularAporte(){
  // Busca en toda la escala la fila quede entre max y min del honorario
  if(this.actoActual.p_aportes<0){
    let indiceEscala = this.getEscalaPorcentual(this.datos.honorarios);
    let escala = this.escalaPorcentualApi[indiceEscala];
    this.datos.aportes = this.escalaPorcentualApi[indiceEscala].aporte_fijo;
    if(escala.aporte_fijo==0)
      this.datos.aportes = this.datos.honorarios*escala.porcentaje_excedente/100;
    if((this.datos.honorarios > escala.min)&&(escala.min>0)){
      let excedente = this.datos.honorarios - escala.min;
      this.datos.aportes += (excedente*escala.porcentaje_excedente/100);    
    }
    if(this.actoActual.p_aportes==-2){
      this.datos.aportes = this.datos.aportes/2;
    }
}
else{
  console.log("No posee escala porcentual")
  if(this.datos.valor*this.actoActual.p_aportes>=this.actoActual.min_aportes)
    this.datos.aportes = this.datos.valor*this.actoActual.p_aportes;
  else
    this.datos.aportes = this.actoActual.min_aportes;
  
}

}

getEscalaPorcentual(valorHonorario : number) : number{
  for(let i=0; i<this.escalaPorcentualApi.length; i++){
    if((valorHonorario<=this.escalaPorcentualApi[i].max)&&(valorHonorario>this.escalaPorcentualApi[i].min))
      return i;
  }
  return 0;
} 

  calcularRcd(): void{
    if(this.datos.valor*this.escribaniaDatosApi[0].p_rcd/100>this.escribaniaDatosApi[0].min_rcd)
      this.datos.rcd=this.datos.valor*this.escribaniaDatosApi[0].p_rcd/100;
    else
      this.datos.rcd=this.escribaniaDatosApi[0].min_rcd;
  }

  calcularGanancias() : void{
    this.datos.valorGanancia = 0;
    if(this.tieneGanancia)
    this.datos.valorGanancia=this.datos.valor*this.actoActual.p_ganancias/100;
  }

  calcularIti() : void{
    this.datos.valorIti = 0;
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
    if(this.listaActores[id].certificados) total+=this.datos.certificado;
    if(this.listaActores[id].municipal) total+=this.datos.municipal;
    if(this.listaActores[id].diligenciamiento) total+=this.datos.diligenciamiento;
    if(this.listaActores[id].rcd) total+=this.datos.rcd;
    if(this.listaActores[id].honorarios) total+=this.datos.honorarios;
    if(this.listaActores[id].aporte) total+=this.datos.aportes/this.listaActores.length;

    if(this.listaActores[id].iva) total+=this.datos.iva;
    if(this.listaActores[id].inscripcion) total+=this.datos.inscripcion;
    if(this.listaActores[id].matricula) total+=this.datos.matricula;
    if(this.listaActores[id].folios) total+=this.datos.folios;
    if(this.listaActores[id].iti) total+=this.datos.valorIti;
    if(this.listaActores[id].ganancias) total+=this.datos.valorGanancia;

    this.listaActores[id].total=total;

  }

  actualizarDatos(datos : Datos){
    this.actoService.actualizarDatos(datos);
  }
  calcular(){
    
    this.datos.nombreCliente= this.formCalculador.value.nombreCliente;
    this.datos.valor= this.formCalculador.value.valor;
    this.setCertificados(this.formCalculador.value.certificados);
    this.setCertificadosMunicipal(this.formCalculador.value.municipal);
    this.setFolios(this.formCalculador.value.folios);
    this.tieneSello = (this.formCalculador.value.sellos==true) ? true : false;
    this.tieneGanancia = (this.formCalculador.value.ganancias==true) ? true : false;
    this.tieneIti = (this.formCalculador.value.iti==true) ? true : false;
    
    this.isShowed = false;
    this.datos.total = 0;
    this.actoService.actualizarIsShowed(this.isShowed)
    this.actoService.eliminarActores();
    this.actoService.eliminarDatos();
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
    this.listaActores.forEach(actor => {
      this.calculcarTotalActor(actor.id);
    });
    this.calcularTotal();
    this.actualizarDatos(this.datos);

    this.actualizarActores();
    this.isShowed = true;
    this.actoService.actualizarIsShowed(this.isShowed)

  }

  calcularTotal (){
    this.listaActores.forEach(actor =>{
      this.datos.total += actor.total;
    })
    console.log("Total totales: "+this.datos.total);
  }


  actualizarActores(){
    this.actoService.eliminarActores();
    console.log(this.actoService.actoresList + "LISTA ACTORES VACIA");
    this.listaActores.forEach(actor => {
      this.actoService.actualizarActores(actor);
    });
  }


  setActo(event: any){  
    this.listaActores = [];
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
   return this.actosApi.find(a => a.id==id);
  }
} 
