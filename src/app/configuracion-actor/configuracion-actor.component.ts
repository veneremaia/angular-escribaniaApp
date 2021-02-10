import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Acto } from '../Acto';
import { Actor } from '../Actor';
import { ActosDataService } from '../actos-data.service';

@Component({
  selector: 'app-configuracion-actor',
  templateUrl: './configuracion-actor.component.html',
  styleUrls: ['./configuracion-actor.component.scss']
})
export class ConfiguracionActorComponent implements OnInit {
  actosApi : Acto[] = [];

  // Actor actual
  actorActual: Actor = {
    "id": 0,
    "nombre_actor": "",
    "id_acto": 0,
    "sellos": false,
    "aporte": false,
    "honorarios": false,
    "iva": false,
    "inscripcion": false,
    "matricula": false,
    "folios": false,
    "certificados":false,
    "municipal": false,
    "diligenciamiento" : false,
    "rcd": false,
    "ganancias": false,
    "iti": false,
    "total": 0
  };

  // acto desde API
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
  constructor(private actosDataService: ActosDataService, private toastr : ToastrService) { }

  ngOnInit(): void {
    this.actosDataService.getActorById(Number(window.location.href.split("/")[window.location.href.split("/").length-1])).subscribe(actor=>this.actorActual=actor);
    this.actosDataService.getAllActos().subscribe(actos=>this.actosApi=actos);
  }


  actualizarDatos(){
    this.actosDataService.updateActor(this.actorActual).subscribe(()=> console.log("anduvo"));;
    this.toastr.success("El actor se actualizó correctamente");

  }

  setNombre(event : any){
    this.actorActual.nombre_actor = event.target.value;
  }

  setActo(event: any){  
   this.actorActual.id_acto = event.value;
  }

  setSello() {
    this.actorActual.sellos = (this.actorActual.sellos ==false) ? true : false;
  }

  setAportes() {
    this.actorActual.aporte = (this.actorActual.aporte ==false) ? true : false;
  }

  setHonorarios() {
    this.actorActual.honorarios = (this.actorActual.honorarios ==false) ? true : false;
  }
  setIva() {
    this.actorActual.iva = (this.actorActual.iva ==false) ? true : false;
  }

  setInscripcion() {
    this.actorActual.inscripcion = (this.actorActual.inscripcion ==false) ? true : false;
  }
  setMatricula() {
    this.actorActual.matricula = (this.actorActual.matricula ==false) ? true : false;
  }
  setFolios() {
    this.actorActual.folios = (this.actorActual.folios ==false) ? true : false;
  }
  setCertificados() {
    this.actorActual.certificados = (this.actorActual.certificados ==false) ? true : false;
  }
  setMunicipal() {
    this.actorActual.municipal = (this.actorActual.municipal ==false) ? true : false;
  }
  setDiligenciamiento() {
    this.actorActual.diligenciamiento = (this.actorActual.diligenciamiento ==false) ? true : false;
  }
  setRcd() {
    this.actorActual.rcd = (this.actorActual.rcd ==false) ? true : false;
  }

  setGanancias() {
    this.actorActual.ganancias = (this.actorActual.ganancias ==false) ? true : false;
  }
  setIti() {
    this.actorActual.rcd = (this.actorActual.iti ==false) ? true : false;
  }
  
}
