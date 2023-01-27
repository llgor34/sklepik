import { Response } from './response.interface';

export interface ProductRaw {
  _id: string;
  cena: number;
  id_firmy: string;
  kod: string;
  typ: 'towar' | 'produkt';
  nazwa_krotka: string;
  nazwa_pelna: string;
  ewidencja: any[];
}

export interface Product extends ProductRaw {
  ilosc: number;
}

export interface ProductResponse extends Response {
  product: ProductRaw | null;
}
