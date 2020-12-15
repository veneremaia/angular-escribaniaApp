import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEventPattern } from 'rxjs';
import { Actor } from './Actor';
import { Datos } from './formulario-edit/Datos';

@Injectable({
  providedIn: 'root'
})



export class ActoDatosService {

  private _actoList : Datos[] = [];
  private _actoresList : Actor[] = [];

  // Observable
  actoList : BehaviorSubject<Datos[]> = new BehaviorSubject<Datos[]>([]);

  actoresList : BehaviorSubject<Actor[]> = new BehaviorSubject<Actor[]>([]);

  constructor() { }


  actualizarDatos(datos: Datos) {
    this._actoList[0]=(datos);
    console.log(this._actoList);
    this.actoList.next(this._actoList);
  }

  actualizarActores(actor: Actor) {
    this._actoresList.push(actor);
    this.actoresList.next(this._actoresList);
  }




}
