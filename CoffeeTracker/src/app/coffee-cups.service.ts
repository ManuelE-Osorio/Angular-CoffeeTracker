import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, asyncScheduler, catchError, scheduled, tap, throwError } from 'rxjs';
import { CoffeeCups, CoffeeMeasureUnits } from './coffee-cups';

@Injectable({
  providedIn: 'root'
})
export class CoffeeCupsService {

  private baseUrl = "https://localhost:7245/api/CoffeeCups";
  // private CoffeList : CoffeeCups[];

  constructor(
    private http: HttpClient
  ) {}

  // handleCoffeeCupsResponse() : CoffeeCups[] {
  //   let response : HttpResponse<CoffeeCups[]>
  //   this.getCoffeeCups().subscribe( resp => {
  //       this.CoffeList = resp.;
  //     })
  //   if(response.status === 200)
  //   return scheduled([response], asyncScheduler)
  // }

  getCoffeeCups() : CoffeeCups[] {
    let cups : CoffeeCups[] = [];
    let request = this.http.get<CoffeeCups[]>(this.baseUrl, {
        observe: 'response',
        responseType: 'json'
      }).pipe(
        tap( resp => console.log(`Get Request with code ${resp.status}`)),
        catchError(this.errorHandler)
      );
    request.subscribe( resp => cups.push( ... this.getRequestHandler(resp)));
    return cups
  }

  getCoffeeCup( id: number) : CoffeeCups {
    let cup : CoffeeCups[] = [];
    let request = this.http.get<CoffeeCups[]>( `${this.baseUrl}/${id}`, {
        observe: 'response',
        responseType: 'json'
      }).pipe(
        tap( resp => console.log(`Get Request with code ${resp.status}`)),
        catchError(this.errorHandler)
      );
    request.subscribe( resp => cup.push( ... this.getRequestHandler(resp)))
    console.log(cup[0])
    return cup[0]
  }

  getRequestHandler( response1: HttpResponse<CoffeeCups[]>) : CoffeeCups[] ;
  getRequestHandler( response2: HttpResponse<CoffeeCups>) : CoffeeCups[] ;
  getRequestHandler( response: HttpResponse<any>) : CoffeeCups[] {
    let coffeeCups : CoffeeCups[] = []
    if (response.status === 200 && response.body != null) {
      if(response.body.length > 0 ) {
        response.body?.forEach((cup: { id: number; description: string; date: Date; measure: number; quantity: number; units: CoffeeMeasureUnits; }) => {
          coffeeCups.push({ id : cup.id,
            description : cup.description,
            date : new Date(cup.date),
            measure : cup.measure,
            quantity : cup.quantity,
            units : cup.units })
        })
      }
      else{
        coffeeCups.push(new coffeeCups{ id : response.body.id,
          description : response.body.description,
          date : new Date(response.body.date),
          measure : response.body.measure,
          quantity : response.body.quantity,
          units : response.body.units })
      }
      return coffeeCups
    }
    return [] as CoffeeCups[]
  }

  // getRequestHandler( response: HttpResponse<CoffeeCups>) : CoffeeCups {
  //   let coffeeCups : CoffeeCups
  //   console.log(response.body)
  //   if (response.status === 200 && response.body != null) {
  //       coffeeCups == new CoffeeCups({ id : response.body[0].id,
  //         description : response.body[0].description,
  //         date : new Date(response.body[0].date),
  //         measure : response.body[0].measure,
  //         quantity : response.body[0].quantity,
  //         units : response.body[0].units })
  //     }
  //   return coffeeCups
  // }

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
