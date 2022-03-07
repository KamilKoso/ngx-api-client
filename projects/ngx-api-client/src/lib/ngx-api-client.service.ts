import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryStringBuilder } from './query-string-builder';
import { Request } from "./models/request";
import { RequestWithBody } from './models/request-with-body';


@Injectable({
  providedIn: 'root'
})
export class NgxApiClientService {
  constructor(private _http: HttpClient) {}

  get<T>(
    uriBase: string,
    request?: Request
  ): Observable<T> {
    const url = this.buildUrl(uriBase, request?.queryParams);
    return this._http.get<T>(url, { headers: request?.headers });
  }

  post<T>(
    uriBase: string,
    request?: RequestWithBody,
  ): Observable<T> {
    const url = this.buildUrl(uriBase, request?.queryParams);
    return this._http.post<T>(url, request?.body, { headers: request?.headers });
  }

  put<T>(
    uriBase: string,
    request?: RequestWithBody,
  ): Observable<T> {
    const url = this.buildUrl(uriBase, request?.queryParams);
    return this._http.put<T>(url, request?.body, { headers: request?.headers });
  }

  patch<T>(
    uriBase: string,
    request?: RequestWithBody,
  ): Observable<T> {
    const url = this.buildUrl(uriBase, request?.queryParams);
    return this._http.patch<T>(url, request?.body, { headers: request?.headers });
  }

  delete<T>(
    uriBase: string,
    request?: Request,
  ): Observable<T> {
    const url = this.buildUrl(uriBase, request?.queryParams);
    return this._http.delete<T>(url, { headers: request?.headers });
  }

  private buildUrl(uri: string, queryParams?: any): string {
    if (queryParams == null) {
      return uri;
    }
    return `${uri}?${QueryStringBuilder.buildQueryParameters(queryParams)}`;
  }
}
