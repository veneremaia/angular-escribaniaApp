import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActoActores } from './api-model';

@Injectable({
  providedIn: 'root'
})

export class ActoDatosService {
  private _isShowed : boolean = false;
  private _isPrinted : boolean = false;
  private _actosActores : ActoActores[] = [];
  private _total : number = 0;

  isShowed : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isPrinted : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  actosActores : BehaviorSubject<ActoActores[]> = new BehaviorSubject<ActoActores[]>([]);
  total : BehaviorSubject<number> = new BehaviorSubject<number>(this._total);
  constructor() { }

  actualizarIsShowed(isShowed : boolean){
    this._isShowed = isShowed;
    this.isShowed.next(this._isShowed);
  }
  actualizarIsPrinted(isPrinted : boolean){
    this._isPrinted = isPrinted;
    this.isPrinted.next(this._isPrinted);
  }

  actualizarTotal(total : number){
    this._total = total;
    this.total.next(this._total);
  }

  limpiarTotal(){
    this._total = 0;
    this.total.next(this._total);
  }

  actualizarActosActores(actosActores : ActoActores[]){
    this._actosActores = actosActores;
    this.actosActores.next(this._actosActores);
  }

  eliminarActosActores(){
    this._actosActores.splice(0,this._actosActores.length);
    this.actosActores.next(this._actosActores);
  }
}
