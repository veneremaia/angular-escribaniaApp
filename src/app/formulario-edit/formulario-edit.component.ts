import { Component, OnInit } from '@angular/core';
import { ActoDatosService } from '../services/datos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Acto, Actor, ActorEditable, Datos, Escala, Escribania } from '../services/api-model';
import { ActosDataService } from '../services/actos-data.service';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';



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
    sellos : new FormControl(''),
    ganancias : new FormControl(''),
    iti : new FormControl(''),
    nombreCliente : new FormControl('', Validators.required),

  });

  //Listado de actores segun acto elegido
  actoresSelected!: ActorEditable[];

  // Dato final que mostraremos en resultados
  datos : Datos  = {
    nombreCliente: '',
    nombreActo: '',
    id_acto : 0,
    valor: 0,
    honorarios: 0,
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

  filteredOptions: Observable<Acto[]> | undefined;
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
    .subscribe(actos =>{
      this.actosApi = actos;
      this.actosApi = this.actosApi.sort((obj1: Acto, obj2: Acto) => {
        if (obj1.nombre_acto.toLowerCase() > obj2.nombre_acto.toLowerCase()) {
          return 1;
        }
        if (obj1.nombre_acto.toLowerCase() < obj2.nombre_acto.toLowerCase())
          return -1;
        return 0;
      })}
      );
    

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

    this.filteredOptions = this.formCalculador.controls.acto.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  goToForm() : void{
    this.isPrinted = false;
    this.actoService.actualizarIsPrinted(this.isPrinted);
  }

  _filter(value: any): Acto[] {
    const filterValue = value.toLowerCase();

    return this.actosApi.filter(option => option.nombre_acto.toLowerCase().includes(filterValue));
  }

  // Setear certificados a todos los actores
  setCertificados(value : string) {
    this.cantCertificados = Number(value);
    this.actoresSelected.forEach(actor => {
      if(actor.actor.certificados){
        // todo el valor
        actor.certificados = this.cantCertificados*this.escribaniaDatosApi[0].certificado;
        actor.hasCertificados = true;      
    }
  });
  }
 
  // Setear municipal a todos los actores
  setCertificadosMunicipal(value : string) {
    this.cantMunicipal = Number(value);
    this.actoresSelected.forEach(actor => {
      if(actor.actor.municipal){
        // todo el valor
        actor.municipal = this.cantMunicipal*this.escribaniaDatosApi[0].imp_municipal;
        actor.hasMunicipal = true;      
    }
  });
  }

  // Setear folios a todos los actores
  setFolios(value : string) {
    this.cantFolios = Number(value);
    this.actoresSelected.forEach(actor => {
      if(actor.actor.folios){
        // todo el valor
        actor.folios = (this.cantFolios*2+2)*this.escribaniaDatosApi[0].folio;
        actor.hasFolios = true;      
    }
  });
  }


  // Setear valor de sello a los actores
  calcularSello() : void {
    if(this.tieneSello){
      let cant = 0;
      this.actoresSelected.forEach(actor=>{
        if(actor.actor.sellos)
        cant++;
      });
      if(cant!=0){
        this.actoresSelected.forEach(actor=>{
          if(actor.actor.sellos){
          actor.sello = (this.datos.valor*this.actoActual.p_sellos/100)/cant;
          actor.hasSello = true;
        
        }})
      }
    }
  }

  // Calcular honorarios
  calcularHonorarios(): void{

    this.actoresSelected.forEach(actor => {
      // si le corresponde pagar honorarios
      if(actor.actor.honorarios){
        actor.hasHonorarios = true;
        if(this.actoActual.p_honorarios<0){
          // por escala
          // Si el valor de escritura es menor o igual al minimo puesto por la escala porcentual de honorarios
          if(this.datos.valor<=this.escribaniaDatosApi[0].min_valor_escritura_he){
            // Se setea el minimo establecido
          actor.honorarios = this.escribaniaDatosApi[0].min_valor_honorario_escala;    
          }else{
            // Se setea el minimo establecido mas el excedente
            let excedente = this.datos.valor - this.escribaniaDatosApi[0].min_valor_escritura_he;
            actor.honorarios = this.escribaniaDatosApi[0].min_valor_honorario_escala + (excedente*this.escribaniaDatosApi[0].p_honorario_escala_exedente);
          }
    
        }else{
          // Sin escala
          // Si es mayor al minimo de honorarios establecido por el acto
          if(this.datos.valor*this.actoActual.p_honorarios/100>this.actoActual.min_honorarios)
          actor.honorarios= this.datos.valor*this.actoActual.p_honorarios/100;
          else
          actor.honorarios=this.actoActual.min_honorarios;
          }
      }
      this.datos.honorarios = actor.honorarios;
    });
  }

  // Calcular iva
  calcularIva(): void{
    this.actoresSelected.forEach(actor => {
      if(actor.actor.iva){
        actor.hasIva = true;
        actor.iva= this.datos.honorarios*21/100;
      }
    });
  }
  // Calcular diligenciamiento
  calcularDiligenciamiento() : void{
    this.actoresSelected.forEach(actor => {
      if(actor.actor.diligenciamiento){
        actor.hasDiligenciamiento = true;
        if(this.datos.valor<this.escribaniaDatosApi[0].min_valor_diligenciamiento)
          actor.diligenciamiento=this.escribaniaDatosApi[0].min_diligenciamiento;
        else{
          let excedente: number = this.datos.valor-this.escribaniaDatosApi[0].min_valor_diligenciamiento;
          actor.diligenciamiento=(excedente/1000)*2+this.escribaniaDatosApi[0].min_diligenciamiento;
      }
      }
    });
  }
  // Calcular inscripcion
  calcularInscripcion(): void {
    this.actoresSelected.forEach(actor => {
      // si le corresponde pagar inscripcion
      if(actor.actor.inscripcion){
        actor.hasInscripcion = true;
        actor.inscripcion= this.datos.valor*0.002+this.escribaniaDatosApi[0].gestor;
      }
    });
  }

  // Calcular aportes
calcularAporte(){
    let cant = 0;
    this.actoresSelected.forEach(actor=>{
      if(actor.actor.aporte)
      cant++;
    });
    if(cant!=0){
      this.actoresSelected.forEach(actor=>{
        if(actor.actor.aporte){
          actor.hasAporte=true;
          // Busca en toda la escala la fila quede entre max y min del honorario
          if(this.actoActual.p_aportes<0){
            let indiceEscala = this.getEscalaPorcentual(this.datos.honorarios);
            let escala = this.escalaPorcentualApi[indiceEscala];
            actor.aporte = escala.aporte_fijo;
            //si el aporte fijo es igual a cero es la primera
            if(escala.aporte_fijo==0)
            actor.aporte = this.datos.honorarios*escala.porcentaje_excedente/100;
            if((this.datos.honorarios > escala.min)&&(escala.min>0)){
              let excedente = this.datos.honorarios - escala.min;
              actor.aporte += (excedente*escala.porcentaje_excedente/100);    
            }
            if(this.actoActual.p_aportes==-2){
              actor.aporte = actor.aporte/2;
            }
        }
        else{
          //No posee escala porcentual
          if(this.datos.valor*this.actoActual.p_aportes>=this.actoActual.min_aportes)
          actor.aporte = this.datos.valor*this.actoActual.p_aportes;
          else
          actor.aporte = this.actoActual.min_aportes;
        }
      }})
    }
}

getEscalaPorcentual(valorHonorario : number) : number{
  for(let i=0; i<this.escalaPorcentualApi.length; i++){
    if((valorHonorario<=this.escalaPorcentualApi[i].max)&&(valorHonorario>this.escalaPorcentualApi[i].min))
      return i;
  }
  return 0;
} 
  // Calcular rcd
  calcularRcd(): void{
    this.actoresSelected.forEach(actor=>{
      if(actor.actor.rcd){
        actor.hasRcd = true;
        if(this.datos.valor*this.escribaniaDatosApi[0].p_rcd/100>this.escribaniaDatosApi[0].min_rcd)
         actor.rcd=this.datos.valor*this.escribaniaDatosApi[0].p_rcd/100;
        else
          actor.rcd=this.escribaniaDatosApi[0].min_rcd;
      }})
    }

  // Calcular ganancia 
  calcularGanancias() : void{
    if(this.tieneGanancia){
        this.actoresSelected.forEach(actor=>{
          if(actor.actor.ganancias){
          actor.ganancias = this.datos.valor*this.actoActual.p_ganancias/100;
          actor.hasGanancias = true;
          }
        })
    }
  }

  // Calcular iti
  calcularIti() : void{
    if(this.tieneIti){
      this.actoresSelected.forEach(actor=>{
        if(actor.actor.iti){
        actor.iti = this.datos.valor*this.actoActual.p_iti/100;
        actor.hasIti = true;
        }
      })
  }
  }
  // Calcular matricula
  calcularMatricula(): void{
      this.actoresSelected.forEach(actor=>{
        if(actor.actor.matricula){
        actor.matricula = this.escribaniaDatosApi[0].matricula;
        actor.hasMatricula = true;
        }
      })
  }

  // Actualizar total actores
  calculcarTotalActor() : void{
    this.actoService.eliminarActores();
    this.actoresSelected.forEach(actor => {
      actor.total = actor.sello +
      actor.aporte + actor.honorarios + 
      actor.iva + actor.inscripcion + 
      actor.matricula + actor.folios + 
      actor.certificados + actor.municipal + 
      actor.diligenciamiento + actor.rcd + 
      actor.ganancias + actor.iti; 
    })
  }
  // Actualizar datos
  actualizarDatos(datos : Datos){
    this.actoService.actualizarDatos(datos);
  }


  calcular(){
    if(this.formCalculador.valid){
    this.actoService.eliminarActores();
    this.actoService.eliminarDatos();
    this.listaActores = [];
    this.isShowed = false;
    this.datos.total = 0;
    //Datos del formulario
    this.datos.nombreCliente= this.formCalculador.value.nombreCliente;
    this.actoActual = this.getActoByName(this.formCalculador.value.acto);
    // Obtener los actores del acto
    this.createActoresByActo();
    this.datos.valor= this.formCalculador.value.valor;
    // Calcula los certificados de cada actor involucrado
    this.setCertificados(this.formCalculador.value.certificados);
    // Calcula el municipal
    this.setCertificadosMunicipal(this.formCalculador.value.municipal);
    // Calcular folios
    this.setFolios(this.formCalculador.value.folios);

    this.tieneSello = (this.formCalculador.value.sellos==true) ? true : false;
    this.tieneGanancia = (this.formCalculador.value.ganancias==true) ? true : false;
    this.tieneIti = (this.formCalculador.value.iti==true) ? true : false;
    this.actoService.actualizarIsShowed(this.isShowed)
    this.datos.nombreActo = this.actoActual.nombre_acto;
    this.datos.id_acto = this.actoActual.id
    this.calcularMatricula();
    // Calcular sello a todos los actores involucrados
    this.calcularSello(); // difiere x acto
    // Calcular ganancias a todos los actores
    this.calcularGanancias(); // 3%
    // Calcular iti a todos los actores
    this.calcularIti(); // 1.5%
    // Calcular honorarios
    this.calcularHonorarios(); // difiere x acto
    // Calcular iva
    this.calcularIva(); //siempre es el 21%
    // Calcular aporte
    this.calcularAporte(); // difiere x acto
    // Calcular rcd
    this.calcularRcd(); // lo configura la escribania
    // Calcular inscripcion
    this.calcularInscripcion(); 
    // Calcular diligenciamiento
    this.calcularDiligenciamiento(); // lo configura la escribania esta en tabla
    // Calcular total de cada actor
    this.calculcarTotalActor();
    // Calcular total
    this.calcularTotal();
    // Actualizar datos
    this.actualizarDatos(this.datos);

    this.actualizarActores();
    this.isShowed = true;
    this.actoService.actualizarIsShowed(this.isShowed)
  }
  }

  // Sirve para el filtro
  getActoByName(nameActo: String): Acto {
      return this.actosApi.find(a => a.nombre_acto.toLocaleLowerCase() == nameActo.toLocaleLowerCase())!;
     
  }

  // Crear actores by acto elegido
  createActoresByActo (){
    // Limpiar actores anteriores
    this.actoService.eliminarActores();
    this.actoresSelected = [];
    // Traer nuevos actores segun acto
    this.setActores(this.actoActual.id);
    this.listaActores.forEach(actor => {
      let actorEditable : ActorEditable =  {
        actor: actor,
        sello: 0,
        hasSello : false,
        aporte: 0,
        hasAporte: false,
        honorarios : 0,
        hasHonorarios: false,
        iva:0,
        hasIva: false,
        inscripcion: 0,
        hasInscripcion: false,
        matricula: 0,
        hasMatricula: false,
        folios: 0,
        hasFolios: false,
        certificados:0,
        hasCertificados: false,
        municipal:0,
        hasMunicipal: false,
        diligenciamiento: 0,
        hasDiligenciamiento: false,
        rcd: 0,
        hasRcd: false,
        ganancias:0,
        hasGanancias: false,
        iti: 0,
        hasIti: false,
        total: 0
      }
      this.actoresSelected.push(Object.assign({}, actorEditable));
      
    });
  }
  // Calcular total
  calcularTotal (){
    this.actoresSelected.forEach(actor =>{
      this.datos.total += actor.total;
    })
  }

  // Actualizar actores
  actualizarActores(){
    this.actoService.eliminarActores();
    this.actoresSelected.forEach(actor => {
      this.actoService.actualizarActores(actor);
    });
  }

  // Trae los actores de la api segun el acto
  setActores(idActo: number): void{
      this.listaActoresApi.forEach(actor => {
        if(actor.id_acto==idActo)
        this.listaActores.push(actor);
      });
  }
  // Trae el acto segun el id
  getActoById(id : any) : any{
   return this.actosApi.find(a => a.id==id);
  }
} 
