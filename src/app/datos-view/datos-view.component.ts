import { Component, OnInit } from '@angular/core';
import { ActorEditable, Datos } from '../services/api-model';
import { ActoDatosService } from '../services/datos.service';


@Component({
  selector: 'app-datos-view',
  templateUrl: './datos-view.component.html',
  styleUrls: ['./datos-view.component.scss']
})


export class DatosViewComponent implements OnInit {
  datosFinales: Datos[]=[];
  datosActores: ActorEditable[]=[];
  // isShowed a actualizar en el service
  isShowed : boolean = false;
  isPrinted : boolean = false;
  constructor(private datos: ActoDatosService) {
      this.datos.actoList.subscribe(d => this.datosFinales= d);
      this.datos.actoresList.subscribe(d => this.datosActores= d);
      // traigo el dato de si se esta mostrando o consultando
      this.datos.isShowed.subscribe(b =>this.isShowed=b);
      this.datos.isPrinted.subscribe(b =>this.isPrinted=b);

      }




  ngOnInit(): void {
    window.addEventListener('cleanInfo', this.limpiarDatos, true);

  }

  updateTotal(checked : any , value : any, actorId : any) : void {
    console.log(actorId);
    this.datosActores.forEach(element => {
      if(element.actor.id==actorId){
      this.datosFinales[0].total -=element.total;
      element.total = (checked)? element.total + value : element.total- value;
      this.datosFinales[0].total +=element.total;
      }
    });
  }

  limpiarDatos(){
    if(!this.isShowed){
    this.datosFinales = [];
    this.datosActores = []; 
    this.datos.actualizarIsShowed(false);
    }
  }

  ngOnDestroy () { 
    window.removeEventListener('cleanInfo', this.limpiarDatos, true);

} 

clickModoImprimir(){
  this.isPrinted = true;
  this.datos.actualizarIsPrinted(this.isPrinted);
}

checkSellos(checked : any, actorId: any){
  this.datosActores.forEach(actor => {
    if(actor.actor.id==actorId){
      actor.hasSello = checked;
      this.updateTotal(checked, actor.sello,actorId);
    }})
}

checkAportes(checked : any, actorId: any){
  this.datosActores.forEach(actor => {
    if(actor.actor.id==actorId){
      actor.hasAporte = checked;
      this.updateTotal(checked, actor.aporte,actorId);
    }})
}

checkCertificados(checked : any, actorId: any){
  this.datosActores.forEach(actor => {
    if(actor.actor.id==actorId){
      actor.hasCertificados = checked;
      this.updateTotal(checked, actor.certificados,actorId);
    }})
}

checkMunicipal(checked : any, actorId: any){
  this.datosActores.forEach(actor => {
    if(actor.actor.id==actorId){
      actor.hasMunicipal = checked;
      this.updateTotal(checked, actor.municipal,actorId);
    }})
}

checkDiligenciamiento(checked : any, actorId: any){
  this.datosActores.forEach(actor => {
    if(actor.actor.id==actorId){
      actor.hasDiligenciamiento = checked;
      this.updateTotal(checked, actor.diligenciamiento,actorId);
    }})
}

checkRcd(checked : any, actorId: any){
  this.datosActores.forEach(actor => {
    if(actor.actor.id==actorId){
      actor.hasRcd = checked;
      this.updateTotal(checked, actor.rcd,actorId);
    }})
}

checkHonorarios(checked : any, actorId: any){
  this.datosActores.forEach(actor => {
    if(actor.actor.id==actorId){
      actor.hasHonorarios = checked;
      this.updateTotal(checked, actor.honorarios,actorId);
    }})
}

checkIva(checked : any, actorId: any){
  this.datosActores.forEach(actor => {
    if(actor.actor.id==actorId){
      actor.hasIva = checked;
      this.updateTotal(checked, actor.iva,actorId);
    }})
}

checkInscripcion(checked : any, actorId: any){
  this.datosActores.forEach(actor => {
    if(actor.actor.id==actorId){
      actor.hasInscripcion = checked;
      this.updateTotal(checked, actor.inscripcion,actorId);
    }})
}

checkMatricula(checked : any, actorId: any){
  this.datosActores.forEach(actor => {
    if(actor.actor.id==actorId){
      actor.hasMatricula = checked;
      this.updateTotal(checked, actor.matricula,actorId);
    }})
}

checkFolios(checked : any, actorId: any){
  this.datosActores.forEach(actor => {
    if(actor.actor.id==actorId){
      actor.hasFolios = checked;
      this.updateTotal(checked, actor.folios,actorId);
    }})
}

checkGanancias(checked : any, actorId: any){
  this.datosActores.forEach(actor => {
    if(actor.actor.id==actorId){
      actor.hasGanancias = checked;
      this.updateTotal(checked, actor.ganancias,actorId);
    }})
}

checkIti(checked : any, actorId: any){
  this.datosActores.forEach(actor => {
    if(actor.actor.id==actorId){
      actor.hasIti = checked;
      this.updateTotal(checked, actor.iti,actorId);
    }})
}



  
}


