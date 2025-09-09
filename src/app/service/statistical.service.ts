import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeliveryRevenueResponse } from '../responses/delivery.revenue.response';
import { RoleCountResponse } from '../responses/role.count.response';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StatisticalService {

    private api_base = `${environment.apiBaseUrl}/api/v1/statistical`;

  constructor(private http: HttpClient) {}
  deliveryRevenue(): Observable<DeliveryRevenueResponse[]> {
    return this.http.get<DeliveryRevenueResponse[]>(this.api_base);
  }

  revenueByMonth(year: number): Observable<DeliveryRevenueResponse[]> {
    const params = new HttpParams().set('year', year);
    return this.http.get<DeliveryRevenueResponse[]>(`${this.api_base}/revenue-by-month`, { params });
  }

  userRoleCounts(): Observable<RoleCountResponse[]> {
    return this.http.get<RoleCountResponse[]>(`${this.api_base}/user-role-counts`);
  }
}
