import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: ApiService) { }

  search(type: string, text: string){
    return this.http.get(type + '/' + text)
  }

}
