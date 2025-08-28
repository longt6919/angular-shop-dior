import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProductDetails } from "../models/product.detail";
import { Observable } from "rxjs";
import { ProductDetailListResponse } from "../responses/product/product.detail.list.response";
import { UpdateProductDetailDTO } from "../dtos/update.product.detail.dto";

@Injectable({ providedIn: 'root' })
export class ProductDetailService {
  private baseUrl = 'http://localhost:8080/api/v1/productDetail';


  constructor(private http: HttpClient) {}

  /** Lấy tất cả productDetail còn hàng (quantity > 0) cho 1 product */
  getAvailableDetails(productId: number): Observable<ProductDetails[]> {
    return this.http.get<ProductDetails[]>(
      `${this.baseUrl}/${productId}`
    );
  }
    /** Lấy tất cả productDetail cho 1 product */
getProductDetailsByIdProduct(
  productId: number,
  keyword: string,
  page: number,
  limit: number
): Observable<ProductDetailListResponse> {
  const params = new HttpParams()
    .set('keyword', keyword)
    .set('page', page.toString())
    .set('limit', limit.toString());
  return this.http.get<ProductDetailListResponse>(`${this.baseUrl}/${productId}`, { params });
}
plusQuantity(productDetailId: number, updateProductDetailDTO: UpdateProductDetailDTO):Observable<any> {
    const token = localStorage.getItem('token');
  return this.http.put(`${this.baseUrl}/update/${productDetailId}`,
   updateProductDetailDTO, 
      {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'text' as 'json'
    }
    );
    
}
minusQuantity(productDetailId: number, updateProductDetailDTO: UpdateProductDetailDTO):Observable<any> {
    const token = localStorage.getItem('token');
  return this.http.put(`${this.baseUrl}/update/minus/${productDetailId}`,
   updateProductDetailDTO, 
      {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'text' as 'json'
    }
    );
    
}



}