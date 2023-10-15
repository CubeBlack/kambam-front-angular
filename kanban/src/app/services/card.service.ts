import { Injectable } from '@angular/core';
import { Card } from '../mocks/mock-card';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class CardService {
  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(environment.apiUrl+'/cards')
      .pipe(
        catchError(this.handleError<Card[]>('getCards', []))
      );
  }

  getCard(id: number): Observable<Card> {
    return this.http.get<Card>(environment.apiUrl + '/cards/' + id)
  }

  insertCard(card: Card): Observable<Card> {
    return this.http.post<Card>(environment.apiUrl+'/cards', card);
  }

  updateCard(card:Card){
    return this.http.put(environment.apiUrl+'/cards/'+card.id, card, this.httpOptions).pipe(
      tap(_ => this.log(`updated card id=${card.id}`)),
      catchError(this.handleError<any>('updateCard'))
    );
  }

  log(msg:string){

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  

}
