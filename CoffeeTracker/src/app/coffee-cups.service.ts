import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, asyncScheduler, catchError, scheduled, tap, throwError } from 'rxjs';
import { CoffeeCups, CoffeeMeasureUnits } from './coffee-cups';

@Injectable({
  providedIn: 'root'
})
export class CoffeeCupsService {

  private baseUrl = "https://localhost:7245/api/CoffeeCups";

  constructor(
    private http: HttpClient
  ) {}

  getCoffeeCups() : Observable<HttpResponse<CoffeeCups[]>> {
    return this.http.get<CoffeeCups[]>(this.baseUrl, {
        observe: 'response',
        responseType: 'json'
      }).pipe(
        tap( resp => console.log(`Get Request with code ${resp.status}`)),
        catchError(this.errorHandler)
      );
  }

  getCoffeeCup( id: number) : Observable<HttpResponse<CoffeeCups>> {
    return this.http.get<CoffeeCups[]>( `${this.baseUrl}/${id}`, {
        observe: 'response',
        responseType: 'json'
      }).pipe(
        tap( resp => console.log(`Get Request with code ${resp.status}`)),
        catchError(this.errorHandler)
      );
  }

  private errorHandler<T>(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return [] as T
  }
}
