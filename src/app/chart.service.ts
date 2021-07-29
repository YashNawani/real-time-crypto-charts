import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { coin } from './Type/currency.interface';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http : HttpClient) { }


  getCurrency() : Observable<coin[]>{
    return this.http.get<coin[]>('https://api.nomics.com/v1/currencies/ticker?key=8172059f0309a50fb7dea7b0672ad7a2a7177ac7&ids=BTC,ETH,XRP&convert=INR&per-page=100&page=1');

  }
}
