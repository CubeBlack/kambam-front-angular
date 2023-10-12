import { Component } from '@angular/core';
import { Card } from 'src/app/mocks/mock-card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent {
  cards: Card[] = [];
  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.getCards();
  }

  getCards(): void {
    this.cardService.getCards()
    .subscribe(heroes => this.cards = heroes);
  }
}
