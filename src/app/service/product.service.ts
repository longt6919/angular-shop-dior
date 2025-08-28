import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../models/product";
import { Observable } from "rxjs";
import { ApiResponse } from "../responses/api.response";
import { InsertProductDTO } from "../dtos/product/insert.product.dto";
import { UpdateProductDTO } from "../dtos/product/update.product.dto";
import { HttpUtilService } from "./http.util.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    private apiGetProducts =`http://localhost:8080/api/v1/products`
     private apiConfig={
    headers:this.httpUtilService.createHeaders(),
  }

  constructor(private http: HttpClient,
        private httpUtilService: HttpUtilService,
  ) { }
  getProductsByActive(keyword: string, categoryId: number, page: number, limit: number):Observable<Product[]>{
    const params = new HttpParams()
    .set('keyword', keyword)
    .set('category_id', categoryId)
    .set('page',page.toString())
    .set('limit',limit.toString());
    return this.http.get<Product[]> (this.apiGetProducts,{params});
  }
    getProducts(keyword: string, categoryId: number, page: number, limit: number):Observable<Product[]>{
    const params = new HttpParams()
    .set('keyword', keyword)
    .set('category_id', categoryId)
    .set('page',page.toString())
    .set('limit',limit.toString());
    return this.http.get<Product[]> (`${this.apiGetProducts}/home/admin`,{params});
  }
  getDetailProduct(productId: number):Observable<Product>{
    return this.http.get<Product>(`${this.apiGetProducts}/${productId}`);
  }
  getProductsByIds(productIds: number[]):Observable<Product[]>{
    const params = new HttpParams().set('ids',productIds.join(','));
    return this.http.get<Product[]>(`${this.apiGetProducts}/by-ids`,{params});
  }
  deleteProduct(productId: number): Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(`${this.apiGetProducts}/${productId}`)
  }
  getProductsByCategoryId(categoryId: number, page: number, limit: number) {
        const params = new HttpParams()
   .set('page',page.toString())
    .set('limit',limit.toString());
  return this.http.get<any>(`${this.apiGetProducts}/by-category?categoryId=${categoryId}`,{params});
}
getProductsByStyleId(styleId: number, page: number, limit: number) {
          const params = new HttpParams()
   .set('page',page.toString())
    .set('limit',limit.toString());
  return this.http.get<any>(`${this.apiGetProducts}/by-style?styleId=${styleId}`,{params});
}
getProductsByBrandId(brandId: number, page: number, limit: number) {
          const params = new HttpParams()
   .set('page',page.toString())
    .set('limit',limit.toString());
  return this.http.get<any>(`${this.apiGetProducts}/by-brand?brandId=${brandId}`,{params});
}
getProductsBySearch(keyword: string, page: number, limit: number) {
          const params = new HttpParams()
   .set('page',page.toString())
    .set('limit',limit.toString());
  return this.http.get<any>(`${this.apiGetProducts}/by-keyword?keyword=${keyword}`,{params});
}
insertProduct(insertProductDTO: InsertProductDTO): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.post(
    `${this.apiGetProducts}`,
    insertProductDTO,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}
updateProduct(productId: number, updatedProduct: UpdateProductDTO): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.put(`${this.apiGetProducts}/${productId}`, updatedProduct, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
uploadImage(productId: number, formData: FormData): Observable<any> {
  const token = localStorage.getItem('token'); // hoặc dùng TokenService nếu có

  return this.http.post(`${this.apiGetProducts}/uploads/${productId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
 deleteProductImage(id:number):Observable<any>{
    return this.http.delete<string>(`${this.apiGetProducts}/product_images/${id}`);
  }

  toggleProductStatus(params: { productId: number, enable: boolean }): Observable<any> {
    const url = `${this.apiGetProducts}/block/${params.productId}/${params.enable ? '1' : '0'}`;
     return this.http.put(url, null, {
    ...this.apiConfig,
    responseType: 'text' as 'json' // 👈 thêm dòng này nếu backend trả string
  });
  }

}