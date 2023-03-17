import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: [ './table.component.css' ]
})

export class TableComponent {
  textSearch = ''

  @Input() config: any = [];
  @Input() data: any = [];
  @Input() isLoading: boolean = false;
  @Input() isFilter: boolean = false;
  @Output() onDelete = new EventEmitter<any>();
  @Output() selectionData = new EventEmitter<any>()

  constructor() {}

  handleDeleteItem = (id: number | string) => {
    return this.onDelete.emit(id)
  }

  selectionRowData(data: object = {}): void {
    this.selectionData.emit(data)
  }

}
