import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent{
  objectValues = (item: any)=> {
    console.log(item)
    return item
  }
  constructor() {}

  @Input()config: any = [];
  @Input()data: any = [];

}
