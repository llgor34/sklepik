import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { Response } from '../interfaces/response.interface';
import { PaymentMethod } from '../interfaces/payment-method.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  createOrder(products: Product[], paymentMethod: PaymentMethod) {
    return this.http.post<Response>('api/order/create', {
      products,
      paymentMethod,
    });
  }
}
