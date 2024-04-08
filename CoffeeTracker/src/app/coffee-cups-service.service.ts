import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, scheduled, throwError } from 'rxjs';
import { CoffeeCups } from './coffee-cups';

@Injectable({
  providedIn: 'root'
})
export class CoffeeCupsServiceService {

  private baseUrl = "https://localhost:7245/api/CoffeeCups"

  constructor(
    private http: HttpClient
  ) {}

  handleCoffeeCupsResponse() : CoffeeCups[] {
    let response : HttpResponse<CoffeeCups[]>
    this.getCoffeeCups().subscribe( resp => {
        response = resp;
      })
    if(response.status === 200)
    return scheduled([])
  }

  private getCoffeeCups() : Observable<HttpResponse<CoffeeCups[]>> {
    return this.http.get<CoffeeCups[]>(this.baseUrl, {
        observe: 'response',
        responseType: 'json'
      }).pipe(
        catchError(this.errorHandler)
      ) 
  }

  private errorHandler(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
