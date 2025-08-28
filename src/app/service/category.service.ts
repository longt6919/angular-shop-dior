import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "../models/category";
import { Observable } from "rxjs";
import { HttpUtilService } from "./http.util.service";
import { UpdateCategoryDTO } from "../dtos/category/UpdateCategoryDTO";
import { InsertCategoryDTO } from "../dtos/category/insert.category.dto";

@Injectable({ 
  providedIn: 'root'
})
export class CategoryService {
     private apiGetCategories  = `http://localhost:8080/api/v1/categories`;
        private apiConfig={
    headers:this.httpUtilService.createHeaders(),
  }

  constructor(private http: HttpClient,
            private httpUtilService: HttpUtilService,
    
  ) { }
  getCategories(page: number, limit: number):Observable<Category[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());     
      return this.http.get<Category[]>(this.apiGetCategories, { params });           
  }
    getCategoriesByAdmin(page: number, limit: number):Observable<Category[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());     
      return this.http.get<Category[]>(`${this.apiGetCategories}/all/admin`, { params });           
  }
  getDetailCategory(id:number): Observable<Category>{
    return this.http.get<Category>(`${this.apiGetCategories}/${id}`);
  }

      toggleCategoryStatus(params: { categoryId: number, enable: boolean }): Observable<any> {
    const url = `${this.apiGetCategories}/block/${params.categoryId}/${params.enable ? '1' : '0'}`;
     return this.http.put(url, null, {
    ...this.apiConfig,
    responseType: 'text' as 'json'
  });
  }
  updateCategory(id:number,updateCategory:UpdateCategoryDTO):Observable<UpdateCategoryDTO>{
    return this.http.put<Category>(`${this.apiGetCategories}/${id}`,updateCategory);
  }
  insertCategory(insertCategoryDTO:InsertCategoryDTO):Observable<any>{
    return this.http.post(this.apiGetCategories,insertCategoryDTO);
  }
// deleteCategory(id:number):Observable<string>{
  //   return this.http.delete(`${this.apiGetCategories}/${id}`,{responseType:'text'});
  // }
}