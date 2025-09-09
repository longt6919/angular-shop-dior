import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../responses/api.response';
import { CreatePaymentDTO } from '../dtos/payment/create.payment.dto';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiPayment  = `${environment.apiBaseUrl}/api/v1`;

  constructor(private http: HttpClient) {}

  /**
   * POST /payments/create_payment_url
   * Truyền vào một CreatePaymentDTO để tạo link thanh toán.
   */
  createPaymentUrl(paymentData: CreatePaymentDTO): Observable<any> {
    return this.http.post(
      `${this.apiPayment}/payments/create_payment_url`,
      paymentData
    );
  }
}
