import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEventPattern } from 'rxjs';
import { Actor } from './Actor';
import { Datos } from './formulario-edit/Datos';

@Injectable({
  providedIn: 'root'
})



export class ActoDatosService {
  private _isShowed : boolean = false;
  private _isPrinted : boolean = false;
  private _actoList : Datos[] = [];
  private _actoresList : Actor[] = [];

  // Observable
  actoList : BehaviorSubject<Datos[]> = new BehaviorSubject<Datos[]>([]);

  actoresList : BehaviorSubject<Actor[]> = new BehaviorSubject<Actor[]>([]);
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
    console.log(this._actoList);
    this.actoList.next(this._actoList);
  }

  actualizarActores(actor: Actor) {
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
