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
  }

  getHero(id:number): Observable<Card> {
    return this.http.get<Card>(this.cards_api_url + '/'+id)
  }
  
}
