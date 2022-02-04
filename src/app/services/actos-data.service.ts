import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Acto, Actor, Escala, Escribania } from './api-model';

const URL_ACTOS = 'https://5ff33aff28c3980017b19205.mockapi.io/acto';
const URL_ACTORES = 'https://5ff33aff28c3980017b19205.mockapi.io/actores';
const URL_DATOS_ESCRIBANIA =
  'https://5ff33aff28c3980017b19205.mockapi.io/escribaniadatos';
const URL_ESCALA_PORCENTUAL =
  'https://5ff33aff28c3980017b19205.mockapi.io/escala_porcentual';

@Injectable({
  providedIn: 'root',
})
export class ActosDataService {
  constructor(private http: HttpClient) {}

  public getAllActos(): Observable<Acto[]> {
    // devuelve un observable
    return this.http.get<Acto[]>(URL_ACTOS);
  }

  public getAllEscalas(): Observable<Escala[]> {
    // devuelve un observable
    return this.http.get<Escala[]>(URL_ESCALA_PORCENTUAL);
  }

  public getActoById(id: Number): Observable<Acto> {
    // devuelve un observable
    return this.http.get<Acto>(URL_ACTOS + '/' + id);
  }

  public getActorById(id: Number): Observable<Actor> {
    // devuelve un observable
    console.log('API, ID LLEGADO ACTOR: ' + id);
    return this.http.get<Actor>(URL_ACTORES + '/' + id);
  }
  public getAllActores(): Observable<Actor[]> {
    // devuelve un observable
    return this.http.get<Actor[]>(URL_ACTORES);
  }

  public getDatosEscribania(): Observable<Escribania[]> {
    // devuelve un observable
    return this.http.get<Escribania[]>(URL_DATOS_ESCRIBANIA);
  }

  public updateActo(acto: Acto): Observable<Acto> {
    return this.http.put<Acto>(URL_ACTOS + '/' + acto.id, acto).pipe();
  }

  public updateActor(actor: Actor): Observable<Actor> {
    return this.http.put<Actor>(URL_ACTORES + '/' + actor.id, actor).pipe();
  }

  public createActo(acto: Acto): Observable<Acto> {
    return this.http.post<Acto>(URL_ACTOS + '/', acto).pipe();
  }

  public createActor(actor: Actor): Observable<Actor> {
    return this.http.post<Actor>(URL_ACTORES + '/', actor).pipe();
  }

  public updateDatosEscribania(escribania: Escribania): Observable<Escribania> {
    return this.http
      .put<Escribania>(URL_DATOS_ESCRIBANIA + '/' + escribania.id, escribania)
      .pipe();
  }

  public updateEscala(escala: Escala): Observable<Escala> {
    return this.http
      .put<Escala>(URL_ESCALA_PORCENTUAL + '/' + escala.id, escala)
      .pipe();
  }
}
