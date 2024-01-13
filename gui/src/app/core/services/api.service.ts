import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { getToken } from './auth/helpers/auth';

@Injectable()
export class ApiService {
  constructor(private _http: HttpClient) {}

  /*
  get(url: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this._http.get(
      `${environment.api_url}${url}`, 
      { headers: this.headers, params });
  }
  */

  post(url: string, data: Object = {}): Observable<any> {
    return this._http.post(
      `${environment.api_url}${url}`, 
      JSON.stringify(data), 
      { headers: this.headers });
  }

  /*
  put(url: string, data: Object = {}): Observable<any> {
    return this._http.put(
      `${environment.api_url}${url}`, 
      JSON.stringify(data), 
      { headers: this.headers });
  }
  */

  patch(url: string, data: Object = {}): Observable<any> {
    return this._http.patch(
      `${environment.api_url}${url}`, 
      JSON.stringify(data), 
      { headers: this.headers });
  }

  /*
  delete(url: string): Observable<any> {
    return this._http.delete(
      `${environment.api_url}${url}`, 
      { headers: this.headers });
  }
  */

  get headers(): HttpHeaders {
    let headersConfig: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    const token = getToken();
    if (!!token) {
      headersConfig.Authorization = 'Bearer ' + token;
    }
    return new HttpHeaders(headersConfig);
  }
}
