import { FormGroup, FormBuilder } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { EMPTY, finalize, forkJoin, switchMap, tap } from "rxjs";

import { XyzService } from '../services/xyz.service'
import { INTERFACE_INFO } from "../app.interface";
import { MODE, ACTION_TYPE } from "../constants";
import { config } from './config.table'

const InitData: INTERFACE_INFO = {
  id: '',
  idCard: '',
  name: '',
  age: 1,
  group: '',
  city: '',
  district: '',
  ward: '',
  status: false,
}

@Component({
  selector: 'app-xyz',
  templateUrl: './xyz.component.html',
  styleUrls: [ './xyz.component.css' ]
})

export class XyzComponent implements OnInit {
  myForm!: FormGroup

  constructor(
    private xyzService: XyzService,
    private fb: FormBuilder
  ) {
  }

  listData: any;
  listAdministrativeBoundaries: any[] = [];
  listSelectionDistrict: any[] = []
  listSelectionWard: any[] = []
  formData: INTERFACE_INFO = InitData;

  modeType: typeof MODE = MODE;
  modeForm: string = this.modeType.ADD;
  tableConfig: typeof config = config;

  isActiveForm: boolean = false;
  isLoading: boolean = false;
  textTitle: string = ''
  textSubmit: string = '';

  reLoadData: object = {
    next: () => this.handleGet(),
    complete: () => this.handleCloseForm()
  }

  setLoadingTable(status: boolean): void {
    this.isLoading = status
  }

  handleUpdateSelection(id: string, typeUpdate: string) {
    if (typeUpdate === 'district') {
      this.listAdministrativeBoundaries.filter(item => {
        if (item.Id === id) {
          this.listSelectionDistrict = item.Districts
        }
      })
    }

    if (typeUpdate === 'ward') {
      this.listSelectionDistrict.filter(item => {
        if (item.Id === id) {
          this.listSelectionWard = item.Wards
        }
      })
    }
    return this.myForm.controls[typeUpdate].setValue('')
  }

  handleOpenForm(mode: string = MODE.ADD, data: INTERFACE_INFO): void {
    switch (mode) {
      case MODE.UPDATE:
        this.textTitle = `${ACTION_TYPE.UPDATE} dữ liệu`
        this.textSubmit = ACTION_TYPE.UPDATE
        this.myForm.controls['idCard'].disable();
        break;
      default:
        this.textTitle = `${ACTION_TYPE.ADD} dữ liệu`
        this.textSubmit = ACTION_TYPE.ADD
        this.myForm.controls['idCard'].enable();
        break;
    }
    Object.entries(data).map(([ key, value ]) => {
      if (key === 'city') {
        this.handleUpdateSelection(value, 'district')
      }
      if (key === 'district') {
        this.handleUpdateSelection(value, 'ward')
      }
      this.myForm.controls[key].setValue(value)
    })
    this.modeForm = mode
    this.isActiveForm = true
  }

  handleCloseForm(): void {
    this.myForm.reset();
    this.isActiveForm = false;
  }

  handleSubmit(): void {
    const formData = <INTERFACE_INFO>this.myForm.getRawValue()
    const { name, age } = formData

    if (name === '') {
      return alert('Trường tên không được để rỗng')
    }
    if (!age || age <= 0) {
      return alert('Trường tuổi lớn hơn 0')
    }

    this.setLoadingTable(true)
    if (this.modeForm === MODE.ADD) {
      this.xyzService.addData(formData).subscribe(this.reLoadData)
    } else {
      this.xyzService.updateData(formData).subscribe(this.reLoadData)
    }
  }

  handleGet() {
    this.xyzService.getData().subscribe({
      next: (res): void => this.listData = res,
      complete: (): void => this.setLoadingTable(false)
    })
  }

  handleDelete(id: string) {
    this.setLoadingTable(true)
    // tap()
    // catchError: return throwError(() => error)
    // finalize()
    this.xyzService.deleteData(id).subscribe({
      next: () => this.handleGet(),
      error: (error: any): void => alert(error)
    })
  }

  ngOnInit() {
    this.myForm = this.fb.group({})

    Object.entries(InitData).map(([ key, value ]) => {
      this.myForm.addControl(key, this.fb.control(value))
    })

    this.setLoadingTable(true)
    forkJoin([ this.xyzService.getData(), this.xyzService.getAdministrativeBoundaries() ])
      .pipe(
        tap(res => {
          this.listData = res[0]
          this.listAdministrativeBoundaries = res[1]
          return EMPTY
        }),
        finalize(() => this.setLoadingTable(false))
      ).subscribe()
  }
}
