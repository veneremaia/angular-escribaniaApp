import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActorEditable, Datos } from './api-model';

@Injectable({
  providedIn: 'root'
})



export class ActoDatosService {
  private _isShowed : boolean = false;
  private _isPrinted : boolean = false;
  private _actoList : Datos[] = [];
  private _actoresList : ActorEditable[] = [];

  // Observable
  actoList : BehaviorSubject<Datos[]> = new BehaviorSubject<Datos[]>([]);

  actoresList : BehaviorSubject<ActorEditable[]> = new BehaviorSubject<ActorEditable[]>([]);
  isShowed : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isPrinted : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  actualizarIsShowed(isShowed : boolean){
    this._isShowed = isShowed;
    this.isShowed.next(this._isShowed);
  }
  actualizarIsPrinted(isPrinted : boolean){
    this._isPrinted = isPrinted;
    this.isPrinted.next(this._isPrinted);
  }
  actualizarDatos(datos: Datos) {
    this._actoList[0]=(datos);
    this.actoList.next(this._actoList);
  }

  actualizarActores(actor: ActorEditable) {
    this._actoresList.push(actor);
    this.actoresList.next(this._actoresList);
  }
  
  eliminarActores(){
    this._actoresList.splice(0,this._actoresList.length);
    this.actoresList.next(this._actoresList);
 }

  eliminarDatos(){
    this._actoList.splice(0,this._actoList.length);
    this.actoList.next(this._actoList);
  }

}
