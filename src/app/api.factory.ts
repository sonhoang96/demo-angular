import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { DOMAIN, HTTP_METHOD } from "./constants";
import { DATA_TYPE } from "./constants";

const { GET, POST, PUT, DELETE, SPECIAL } = HTTP_METHOD

@Injectable({
  providedIn: 'root'
})

export class ApiFactory {

  constructor(private http: HttpClient) {
  }

  public fetchApi(data: any, method: string = GET, typeResult: string = DATA_TYPE.ANY, param: string = ''): Observable<any> {
    const callApi = this.http;
    const administrativeBoundaries = 'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json'
    switch (method) {
      case SPECIAL:
        return callApi.get<typeof typeResult>(`${administrativeBoundaries}`)
      case GET:
        return callApi.get<typeof typeResult>(`${DOMAIN}/${param}`)
      case PUT:
        return callApi.put<typeof typeResult>(`${DOMAIN}/${param}/${data.id}`, data)
      case POST:
        return callApi.post<typeof typeResult>(`${DOMAIN}/${param}`, data)
      case DELETE:
        return callApi.delete<typeof typeResult>(`${DOMAIN}/${param}/${data}`)
      default:
        throw new Error('Can not call api, the method type is invalid')
    }
  }
}
