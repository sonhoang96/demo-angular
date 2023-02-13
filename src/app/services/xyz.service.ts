import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { HTTP_METHOD } from "../constants";
import { ApiFactory } from "../api.factory";
import { DATA_TYPE } from "../constants";
import { INTERFACE_INFO } from "../app.interface";

const {GET, POST, PUT, DELETE} = HTTP_METHOD

@Injectable({
  providedIn: 'root'
})

export class XyzService {

  constructor(private apiFactory: ApiFactory) {
  }

  public getData(): Observable<any> {
    return this.apiFactory.fetchApi(null, GET, DATA_TYPE.ARRAY, 'data')
  }

  public addData(data: object): Observable<any> {
    return this.apiFactory.fetchApi(data, POST, DATA_TYPE.OBJECT, 'data')
  }

  public updateData(data: INTERFACE_INFO): Observable<any> {
    return this.apiFactory.fetchApi(data, PUT, DATA_TYPE.OBJECT, 'data')
  }

  public deleteData(id: string): Observable<any> {
    return this.apiFactory.fetchApi(id, DELETE, DATA_TYPE.OBJECT, 'data')
  }
}
