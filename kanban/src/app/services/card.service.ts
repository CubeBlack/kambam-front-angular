import { Injectable } from '@angular/core';
import { Card } from '../mocks/mock-card';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cards_api_url = 'http://localhost:8000/api/cards';

  constructor(private http: HttpClient) { }

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.cards_api_url)
      .pipe(
        catchError(this.handleError<Card[]>('getCards', []))
      );
  }

  getCard(id: number): Observable<Card> {
    return this.http.get<Card>(this.cards_api_url + '/' + id)
  }

  insertCard(card: Card): Observable<Card> {
    return this.http.post<Card>(this.cards_api_url, card);
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
