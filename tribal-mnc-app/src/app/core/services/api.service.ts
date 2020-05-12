import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RequestOptions } from '../models/http/request-options';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly host = environment.apiUrl;

  constructor(protected http: HttpClient) {
    this.host = environment.apiUrl;
  }

  public delete<T>(
    url: string,
    options?: RequestOptions & { observe?: 'response' | 'body' },
    showValidationErrorMessage = true,
  ): Observable<T> {
    return this.http.delete<T>(
      `${this.host}${this.host ? '/' : ''}${url}`,
      options,
    );
  }

  public get<T>(url: string, option?: RequestOptions): Observable<T>;

  public get<T>(
    url: string,
    option?: RequestOptions & { observe: 'response' },
  ): Observable<HttpResponse<T>>;

  public get(
    url: string,
    option?: RequestOptions & { responseType: 'arraybuffer' },
  ): Observable<ArrayBuffer>;

  public get(
    url: string,
    option?: RequestOptions & { responseType: 'blob' },
  ): Observable<Blob>;

  public get(
    url: string,
    option?: RequestOptions & { responseType: 'blob' } & {
      observe: 'response';
    },
  ): Observable<HttpResponse<Blob>>;

  public get(
    url: string,
    option?: RequestOptions & { observe?: 'body' | 'events' | 'response' } & {
      responseType?: 'blob' | 'arraybuffer';
    },
  ): Observable<any> {
    return this.http.get(`${this.host}${this.host ? '/' : ''}${url}`, option);
  }

  public patch<T>(
    url: string,
    body: any,
    options?: RequestOptions & { observe?: 'body' | 'events' | 'response' },
  ): Observable<T> {
    return this.http.patch<T>(
      `${this.host}${this.host ? '/' : ''}${url}`,
      body,
      options,
    );
  }

  public post<T>(
    url: string,
    body: any,
    options?: RequestOptions,
    showValidationErrorMessage?: boolean,
  ): Observable<T>;

  public post<T>(
    url: string,
    body: any,
    options?: RequestOptions & { responseType: 'blob' } & {
      observe: 'response';
    },
    showValidationErrorMessage?: boolean,
  ): Observable<HttpResponse<Blob>>;

  public post<T>(
    url: string,
    body: any,
    option?: RequestOptions & { observe: 'events' },
    showValidationErrorMessage?: boolean,
  ): Observable<HttpEvent<T>>;

  public post<T>(
    url: string,
    body: any,
    options?: RequestOptions & { observe?: 'body' | 'events' | 'response' },
    showValidationErrorMessage = true,
  ): Observable<T> {
    return this.http.post<T>(
      `${this.host}${this.host ? '/' : ''}${url}`,
      body,
      options,
    );
  }

  public put<T>(
    url: string,
    body: any,
    options?: RequestOptions & { observe?: 'response' | 'body' },
  ): Observable<T> {
    return this.http.put<T>(
      `${this.host}${this.host ? '/' : ''}${url}`,
      body,
      options,
    );
  }
}
