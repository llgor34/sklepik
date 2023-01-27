import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './interfaces/product.interface';
import { Response } from './interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class SellService {
  constructor(private http: HttpClient) {}

  insertSell(products: Product[]) {
    return this.http.post<Response>('api/sell/insert', { products });
  }
}
