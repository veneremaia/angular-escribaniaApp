 import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Acto } from './Acto';
import { Actor } from './Actor';

const URL_ACTOS = "https://5fc7fbabf3c77600165d8f57.mockapi.io/acto"
const URL_ACTORES = "https://5fc7fbabf3c77600165d8f57.mockapi.io/actores"

@Injectable({
  providedIn: 'root'
})
export class ActosDataService {


  constructor(private http : HttpClient) { }

  public getAllActos() : Observable<Acto[]>{
    // devuelve un observable
    return this.http.get<Acto[]>(URL_ACTOS)
  }

  public getAllActores() : Observable<Actor[]>{
    // devuelve un observable
    return this.http.get<Actor[]>(URL_ACTORES)
  }
}
