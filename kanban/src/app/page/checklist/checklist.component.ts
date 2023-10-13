import { group } from '@angular/animations';
import { Component } from '@angular/core';
import { Card } from 'src/app/mocks/mock-card';
import { CardService } from 'src/app/services/card.service';


interface Item extends Card {
  project_visible: boolean;
  group_visible: boolean;
}

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent {
  cards: Card[] = [];
  itens: Item[] = [];

  novo_card: Card = {
    project: '',
    group: '',
    status: 'to do',
    title: '',
    description: '',
    id: 0
  };

  status_options = [
    { value: 'To Do', key: 'to do' },
    { value: 'In progress', key: 'In progress' },
    { value: 'To test', key: 'to test' },
    { value: 'Completed', key: 'completed' },
    { value: 'Canceled', key: 'Canceled' },
  ];

  form_new_item_visible: boolean = false;

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.getCards();

  }

  set_new_item_visible() {
    this.form_new_item_visible = true;
  }

  set_new_item_hide() {
    this.form_new_item_visible = false;
  }

  form_new_item_save() {
    this.set_new_item_hide();



    this.cardService.insertCard(this.novo_card)
      .subscribe((cards) => {
        this.getCards();
      });
  }

  getCards(): void {
    this.cardService.getCards()
      .subscribe((cards) => {
        this.cards = cards;
        this.cards_to_itens();
      });
  }

  cards_to_itens(): void {
    let last_project: string = '';
    let last_group: string = '';

    this.itens = [];

    for (let card_index = 0; card_index < this.cards.length; card_index++) {
      const card = this.cards[card_index];

      let item: Item = {
        'project': card.project,
        'project_visible': last_project != card.project,
        'group': card.group,
        'group_visible': last_group != card.group,
        'status': card.status,
        'title': card.title,
        'description': card.description,
        'id': card.id
      };

      last_project = card.project;
      last_group = card.group;


      this.itens.push(item);
    }
  }

  item_to_card(item:Item):Card{
    return {
      project:item.project,
      group:item.group,
      status:item.status,
      title:item.title,
      description:item.description,
      id:item.id
    }
  }

  update_item(item: Item) {
    this.cardService.updateCard(this.item_to_card(item)).subscribe(()=>{
      this.getCards();
    });
  }

  get_element_text_by_envet(event: Event):string{
    const elemento = <Element>event.target;
    const conteudo = elemento.innerHTML;
    return conteudo;
  }

  get_element_value_by_envet(event: Event):string{
    const elemento = <Element>event.target;
    const conteudo = elemento.nodeValue;

    return <string>conteudo;
    
  }

  set_title_by_event_and_save(event: Event, item:Item):void{
    item.title = this.get_element_text_by_envet(event);
    this.update_item(item);
  }
}
