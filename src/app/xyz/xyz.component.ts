import { FormGroup, FormBuilder } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { EMPTY, finalize, forkJoin, tap } from "rxjs";

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

  setLoadingTable(status: boolean): void {
    this.isLoading = status
  }

  onInitFormData(): void {
    this.myForm = this.fb.group({})
    //Initial controls
    Object.entries(InitData).map(([ key, value ]) => {
      this.myForm.addControl(key, this.fb.control(value))
    })
    //handle rendering list district after choose city
    this.myForm.get('city')?.valueChanges.subscribe((selectionChange) => {
      this.myForm.get('district')?.setValue('')
      this.myForm.get('ward')?.setValue('')
      this.listAdministrativeBoundaries.filter(item => {
        if (item.Id === selectionChange) {
          this.listSelectionDistrict = item.Districts
        }
      })
    })
    this.myForm.get('district')?.valueChanges.subscribe((selectionChange) => {
      this.myForm.get('ward')?.setValue('')
      this.listSelectionDistrict.filter(item => {
        if (item.Id === selectionChange) {
          this.listSelectionWard = item.Wards
        }
      })
    })
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
      this.myForm.get(key)?.setValue(value)
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
      this.xyzService.addData(formData).subscribe({
        next: () => this.handleGet(),
        complete: () => this.handleCloseForm()
      })
    } else {
      this.xyzService.updateData(formData).subscribe({
        next: () => this.handleGet(),
        complete: () => this.handleCloseForm()
      })
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

    this.xyzService.deleteData(id).subscribe({
      next: () => this.handleGet(),
      error: (error: any): void => alert(error)
    })
  }

  ngOnInit() {
    this.onInitFormData()
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
