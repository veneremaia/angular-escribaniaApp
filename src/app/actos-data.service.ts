 import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Acto } from './Acto';
import { Actor } from './Actor';
import { Escribania } from './Escribaniadatos';

const URL_ACTOS = "https://5ff33aff28c3980017b19205.mockapi.io/acto"
const URL_ACTORES = "https://5ff33aff28c3980017b19205.mockapi.io/actores"
const URL_DATOS_ESCRIBANIA = "https://5ff33aff28c3980017b19205.mockapi.io/escribaniadatos"

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

  public getDatosEscribania() : Observable<Escribania[]>{
    // devuelve un observable
    return this.http.get<Escribania[]>(URL_DATOS_ESCRIBANIA)
  }

  public updateActo(acto : Acto) : Observable<Acto>{
    const httpOptions ={ 
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put<Acto>(URL_ACTOS+"/"+acto.id,acto,httpOptions).pipe();
  }

  public updateDatosEscribania(escribania : Escribania) : Observable<Escribania>{
    const httpOptions ={ 
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put<Escribania>(URL_DATOS_ESCRIBANIA+"/"+escribania.id,escribania,httpOptions).pipe();
  }
}
