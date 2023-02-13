import { Component, OnInit } from '@angular/core';

import { XyzService } from '../services/xyz.service'
import { MODE, ACTION_TYPE } from "../constants";
import { INTERFACE_INFO } from "../app.interface";

const InitData: INTERFACE_INFO = { id: '', name: '', age: 0 }

@Component({
  selector: 'app-xyz',
  templateUrl: './xyz.component.html',
  styleUrls: [ './xyz.component.css' ]
})

export class XyzComponent implements OnInit {
  constructor(private xyzService: XyzService) {
  }

  isActiveForm: boolean = false
  textSubmit: string = '';

  listData: any;
  dataForm: INTERFACE_INFO = InitData;

  modeType: typeof MODE = MODE;
  modeForm: string = this.modeType.ADD;

  handleOpenForm(mode: string = MODE.ADD, data: INTERFACE_INFO): void {
    switch (mode) {
      case MODE.UPDATE:
        this.dataForm = { ...data }
        this.textSubmit = ACTION_TYPE.UPDATE
        break;
      default:
        this.dataForm = InitData
        this.textSubmit = ACTION_TYPE.ADD
        break;
    }
    this.modeForm = mode
    this.isActiveForm = true
  }

  handleCloseForm(): void {
    this.dataForm = InitData;
    this.isActiveForm = false;
  }

  async handleSubmit() {
    const { id, name, age } = this.dataForm

    if (name === '') {
      return alert('Trường tên không được để rỗng')
    }
    if (!age || age <= 0) {
      return alert('Trường tuổi lớn hơn 0')
    }

    try {
      if (this.modeForm === MODE.ADD) {
        await this.xyzService.addData({ name, age }).subscribe()
      } else {
        await this.xyzService.updateData({ id, name, age }).subscribe()
      }
      this.handleCloseForm()
      await this.handleGet()
    } finally {
      //TODO: set sth here
    }
  }

  handleGet(): void {
    this.xyzService.getData().subscribe({
      next: (res: any) => this.listData = res,
      error: (error: any): void => console.log(error)
    })
  }

  handleDelete(id: string): void {
    try {
      this.xyzService.deleteData(id).subscribe({ error: (error: any): void => console.log(error) })
      this.handleGet()
    } catch (e) {
      alert(e)
    }
  }

  async ngOnInit() {
    await this.handleGet()
  }
}
