import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from "../environments/environment";

export interface CartItemReq { detailId: number; qty: number; }
export interface CartItemCheck { detailId: number; requested: number; available: number; ok: boolean; }

@Injectable({ providedIn: 'root' })
export class StockService {
  private baseUrl = `${environment.apiBaseUrl}/api/v1/api/product-details/stock`;
  constructor(private http: HttpClient) {}

  getAvailable(detailId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/${detailId}/available`);
  }

  checkCart(items: CartItemReq[]): Observable<CartItemCheck[]> {
    return this.http.post<CartItemCheck[]>(`${this.baseUrl}/cart/check`, items);
  }
}
