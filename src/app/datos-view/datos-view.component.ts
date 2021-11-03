import { Component, OnInit } from '@angular/core';
import { ActoActores } from '../services/api-model';
import { ActoDatosService } from '../services/datos.service';


@Component({
  selector: 'app-datos-view',
  templateUrl: './datos-view.component.html',
  styleUrls: ['./datos-view.component.scss']
})


export class DatosViewComponent implements OnInit {
  actosActores : ActoActores[]=[];
  // isShowed a actualizar en el service
  isShowed : boolean = false;
  isPrinted : boolean = false;
  total : number = 0
  constructor(private datos: ActoDatosService) {
      this.datos.actosActores.subscribe(d => this.actosActores= d);
      this.datos.total.subscribe(d => this.total= d);
      // traigo el dato de si se esta mostrando o consultando
      this.datos.isShowed.subscribe(b =>this.isShowed=b);
      this.datos.isPrinted.subscribe(b =>this.isPrinted=b);

      }




  ngOnInit(): void {
    window.addEventListener('cleanInfo', this.limpiarDatos, true);

  }

  updateTotal(checked : any , value : any, actorId : any,index: number,) : void {
    console.log(actorId);
    this.actosActores[index].actores.forEach(element => {
      if(element.actor.id==actorId){
        this.actosActores[index].datos.total -=element.total;
      element.total = (checked)? element.total + value : element.total- value;
      this.actosActores[index].datos.total +=element.total;
      }
    });
    this.total = 0;
    this.actosActores.forEach(acto => {
      this.total += acto.datos.total;
    });
  }

  limpiarDatos(){
    if(!this.isShowed){
    this.actosActores = [];
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

checkSellos(checked : any,index: number, actorId: any){
  this.actosActores[index].actores.forEach(actor => {
    if(actor.actor.id==actorId){
      actor.hasSello = checked;
      this.updateTotal(checked, actor.sello,actorId,index);
    }})
}

checkAportes(checked : any,index: number, actorId: any){
  this.actosActores[index].actores.forEach(actor => {
    if(actor.actor.id==actorId){
      actor.hasAporte = checked;
      this.updateTotal(checked, actor.aporte,actorId,index);
    }})
}

checkCertificados(checked : any,index: number, actorId: any){
  this.actosActores[index].actores.forEach(actor => {
    if(actor.actor.id==actorId){
      actor.hasCertificados = checked;
      this.updateTotal(checked, actor.certificados,actorId,index);
    }})
}

checkMunicipal(checked : any,index: number, actorId: any){
  this.actosActores[index].actores.forEach(actor => {
    if(actor.actor.id==actorId){
      actor.hasMunicipal = checked;
      this.updateTotal(checked, actor.municipal,actorId,index);
    }})
}

checkDiligenciamiento(checked : any,index: number, actorId: any){
  this.actosActores[index].actores.forEach(actor => {
    if(actor.actor.id==actorId){
      actor.hasDiligenciamiento = checked;
      this.updateTotal(checked, actor.diligenciamiento,actorId,index);
    }})
}

checkRcd(checked : any,index: number, actorId: any){
  this.actosActores[index].actores.forEach(actor => {
    if(actor.actor.id==actorId){
      actor.hasRcd = checked;
      this.updateTotal(checked, actor.rcd,actorId,index);
    }})
}

checkHonorarios(checked : any,index: number, actorId: any){
  this.actosActores[index].actores.forEach(actor => {
    if(actor.actor.id==actorId){
      actor.hasHonorarios = checked;
      this.updateTotal(checked, actor.honorarios,actorId,index);
    }})
}

checkIva(checked : any,index: number, actorId: any){
  this.actosActores[index].actores.forEach(actor => {
    if(actor.actor.id==actorId){
      actor.hasIva = checked;
      this.updateTotal(checked, actor.iva,actorId,index);
    }})
}

checkInscripcion(checked : any,index: number, actorId: any){
  this.actosActores[index].actores.forEach(actor => {
    if(actor.actor.id==actorId){
      actor.hasInscripcion = checked;
      this.updateTotal(checked, actor.inscripcion,actorId,index);
    }})
}

checkMatricula(checked : any,index: number, actorId: any){
  this.actosActores[index].actores.forEach(actor => {
    if(actor.actor.id==actorId){
      actor.hasMatricula = checked;
      this.updateTotal(checked, actor.matricula,actorId,index);
    }})
}

checkFolios(checked : any,index: number, actorId: any){
  this.actosActores[index].actores.forEach(actor => {
    if(actor.actor.id==actorId){
      actor.hasFolios = checked;
      this.updateTotal(checked, actor.folios,actorId,index);
    }})
}

checkGanancias(checked : any,index: number, actorId: any){
  this.actosActores[index].actores.forEach(actor => {
    if(actor.actor.id==actorId){
      actor.hasGanancias = checked;
      this.updateTotal(checked, actor.ganancias,actorId,index);
    }})
}

checkIti(checked : any,index: number, actorId: any){
  this.actosActores[index].actores.forEach(actor => {
    if(actor.actor.id==actorId){
      actor.hasIti = checked;
      this.updateTotal(checked, actor.iti,actorId,index);
    }})
}



  
}


