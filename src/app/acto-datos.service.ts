import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEventPattern } from 'rxjs';
import { Datos } from './formulario-edit/Datos';

@Injectable({
  providedIn: 'root'
})



export class ActoDatosService {

  private _actoList : Datos[] = [];
  // Observable
  actoList : BehaviorSubject<Datos[]> = new BehaviorSubject<Datos[]>([]);
  constructor() { }


  actualizar(datos: Datos) {
    this._actoList[0]=(datos);
    console.log(this._actoList);
    this.actoList.next(this._actoList);
  }


}
