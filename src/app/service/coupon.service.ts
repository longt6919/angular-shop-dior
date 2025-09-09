import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../responses/api.response";
import {environment} from "../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CouponService{
    private apiCoupon = `${environment.apiBaseUrl}/api/v1/coupons`;

    constructor(private http: HttpClient){}
    calculateCouponValue(couponCode: string, totalAmount: number):Observable<ApiResponse>{
        const url = `${this.apiCoupon}/calculate`;
        const params = new HttpParams().set('couponCode',couponCode).set('totalAmount',totalAmount.toString());
        return this.http.get<ApiResponse>(url,{params});
    }
}
