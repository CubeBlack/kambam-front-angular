import { group, query } from '@angular/animations';
import { Component } from '@angular/core';
import { Card } from 'src/app/mocks/mock-card';
import { CardService } from 'src/app/services/card.service';


interface Item extends Card {
  project_visible: boolean;
  group_visible: boolean;
  style_class:string;
}

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent {
  cards: Card[] = [];
  itens: Item[] = [];
  filter_project:string = '';

  novo_card: Card = {
    project: '',
    group: '',
    status: 'to do',
    title: '',
    description: '',
    id: 0
  };

  status_options = [
    { value: 'To Do',       key: 'to do',       onFilter:true, style_class:'item_todo' },
    { value: 'In progress', key: 'in progress', onFilter:true, style_class:'item_inprogress' },
    { value: 'To test',     key: 'to test',     onFilter:true, style_class:'item_totest' },
    { value: 'Completed',   key: 'completed',   onFilter:false, style_class:'item_completed' },
    { value: 'Canceled',    key: 'canceled',    onFilter:false, style_class:'item_canceled' },
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
    let query = this.make_query_by_filter();

    this.cardService.getCards(query)
      .subscribe((cards) => {
        this.cards = cards;
        this.cards_to_itens();
      });
  }

  status_to_style_class(status:string):string{
    for (let oIndex = 0; oIndex < this.status_options.length; oIndex++) {
      const option_status = this.status_options[oIndex];
      if(option_status.key == status){
        return option_status.style_class;
      }
    }

    return "item_erro";
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
        'id': card.id,
        'style_class':this.status_to_style_class(card.status)
      };

      console.log(item.style_class);

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

  update_item(item: Item, refresh:boolean=false) {
    this.cardService.updateCard(this.item_to_card(item)).subscribe(()=>{
      if(refresh){
        this.getCards();
      }
    });
  }

  get_element_text_by_event(event: Event):string{
    const elemento = <Element>event.target;
    const conteudo = <string>elemento.textContent;
    return conteudo;
  }

  get_element_value_by_event(event: Event):string{
    const elemento = <any>event.target;
    const conteudo = elemento.value;
    return <string>conteudo;
  }

  set_title_by_event_and_save(event: Event, item:Item):void{
    item.title = this.get_element_text_by_event(event);
    this.update_item(item);
  }

  set_description_by_event_and_save(event: Event, item:Item):void{
    item.title = this.get_element_text_by_event(event);
    this.update_item(item);
  }

  set_status_by_event_and_save(event: Event, item:Item){
    item.status = this.get_element_value_by_event(event);
    console.log(item.status);
    this.update_item(item, true);
  }

  make_query_by_filter():string{
    let query:string ='';
    
    query += `project=${this.filter_project}&`;
    for (let oIndex = 0; oIndex < this.status_options.length; oIndex++) {
      const status = this.status_options[oIndex];
      query += `${status.key}=${status.onFilter}&`;
    }
    return query;
  }
}
