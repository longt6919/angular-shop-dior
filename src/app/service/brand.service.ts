import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Brand } from "../models/brand";
import { UpdateBrandDTO } from "../dtos/brand/update.brand.dto";
import { InsertBrandDTO } from "../dtos/brand/insert.brand.dto";
import { HttpUtilService } from "./http.util.service";

@Injectable({ 
  providedIn: 'root'
})
export class BrandService {
     private apiGetBrands  = `http://localhost:8080/api/v1/brand`;
        private apiConfig={
    headers:this.httpUtilService.createHeaders(),
  }
  constructor(private http: HttpClient,
                private httpUtilService: HttpUtilService,
  ) { }
  getBrands(page: number, limit: number):Observable<Brand[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());     
      return this.http.get<Brand[]>(this.apiGetBrands, { params });           
  }
    getBrandsByAdmin(page: number, limit: number):Observable<Brand[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());     
      return this.http.get<Brand[]>(`${this.apiGetBrands}/all/admin`, { params });           
  }
  getDetailBrand(id:number): Observable<Brand>{
    return this.http.get<Brand>(`${this.apiGetBrands}/${id}`);
  }
  deleteBrand(id:number):Observable<string>{
    return this.http.delete(`${this.apiGetBrands}/${id}`,{responseType:'text'});
  }
  updateBrand(id:number,updateBrand:UpdateBrandDTO):Observable<UpdateBrandDTO>{
    return this.http.put<Brand>(`${this.apiGetBrands}/${id}`,updateBrand);
  }
  insertBrand(insertBrandDTO:InsertBrandDTO):Observable<any>{
    return this.http.post(this.apiGetBrands,insertBrandDTO,);
  }
  toggleBrandStatus(params: { brandId: number, enable: boolean }): Observable<any> {
    const url = `${this.apiGetBrands}/block/${params.brandId}/${params.enable ? '1' : '0'}`;
     return this.http.put(url, null, {
    ...this.apiConfig,
    responseType: 'text' as 'json'
  });
  }
}