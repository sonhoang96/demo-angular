import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { DOMAIN, HTTP_METHOD } from "./constants";
import { Injectable } from "@angular/core";
import { DATA_TYPE } from "./constants";

@Injectable({
  providedIn: 'root'
})

export class ApiFactory {

  constructor(private http: HttpClient) {
  }

  public fetchApi(data: any, method: string, typeResult: string = DATA_TYPE.ANY, param: string = ''): Observable<any> {
    const callApi = this.http
    switch (method) {
      case HTTP_METHOD.GET:
        return callApi.get<typeof typeResult>(`${DOMAIN}/${param}`)
      case HTTP_METHOD.PUT:
        return callApi.put<typeof typeResult>(`${DOMAIN}/${param}/${data.id}`, data)
      case HTTP_METHOD.POST:
        return callApi.post<typeof typeResult>(`${DOMAIN}/${param}`, data)
      case HTTP_METHOD.DELETE:
        return callApi.delete<typeof typeResult>(`${DOMAIN}/${param}/${data}`)
      default:
        throw new Error('Can not call api, the method type is invalid')
    }
  }
}
