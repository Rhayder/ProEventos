import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

public eventos: any = [];
public eventosFiltered: any = [];

  widthImg: number = 150;
  marginImg: number = 2;
  ShowImg: boolean = true;
  private _filterList: string = '';

public get filterList(): string {
  return this._filterList;
}

public set filterList(value: string) {
  this._filterList = value;
  this.eventosFiltered = this.filterList ? this.filterEventos(this.filterList) : this.eventos
}

filterEventos(filterBy: string): any{
  filterBy = filterBy.toLocaleLowerCase();
return this.eventos.filter(
  (evento: { tema: string; local: string; }) => evento.tema.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
  evento.local.toLocaleLowerCase().indexOf(filterBy) !== -1
)
}

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos();
  }

  ShowImage(){
    this.ShowImg = !this.ShowImg;
  }

public getEventos(): void {
this.http.get('https://localhost:5001/api/eventos').subscribe(
  response => {
    this.eventos = response
    this.eventosFiltered = this.eventos
  },
  error => console.log(error)
);

}

}
