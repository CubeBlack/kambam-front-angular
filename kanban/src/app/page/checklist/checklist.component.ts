import { group } from '@angular/animations';
import { Component } from '@angular/core';
import { Card } from 'src/app/mocks/mock-card';
import { CardService } from 'src/app/services/card.service';


interface Item  extends Card{
  project_visible:boolean;
  group_visible:boolean;
}

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent {
  cards: Card[] = [];
  itens: Item[] = [];
  

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
   this.getCards();

  }

  getCards(): void {
    this.cardService.getCards()
      .subscribe((cards)=>{
        this.cards = cards;
        this.cards_to_itens();
      });
  }

  cards_to_itens():void{
    let last_project: string = '';
    let last_group: string = '';

    this.itens = [];

    for (let card_index = 0; card_index < this.cards.length; card_index++) {
      const card = this.cards[card_index];

      let item:Item = {
        'project':card.project,
        'project_visible':last_project != card.project,
        'group':card.group,
        'group_visible':last_group != card.group,
        'status':card.status,
        'title':card.title,
        'description':card.description,
        'id':card.id
      };

      last_project = card.project;
      last_group = card.group;


      this.itens.push(item);
            
    }
  }

  

}
