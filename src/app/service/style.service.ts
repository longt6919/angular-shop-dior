import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "../models/category";
import { Observable } from "rxjs";
import { Style } from "../models/style";
import { UpdateStyleDTO } from "../dtos/style/update.style.dto";
import { InsertStyleDTO } from "../dtos/style/insert.style.dto";
import { HttpUtilService } from "./http.util.service";

@Injectable({ 
  providedIn: 'root'
})
export class StyleService {
     private apiGetStyles  = `http://localhost:8080/api/v1/styles`;

  constructor(private http: HttpClient,
                    private httpUtilService: HttpUtilService,
  ) { }
         private apiConfig={
    headers:this.httpUtilService.createHeaders(),
  }
  getStyles(page: number, limit: number):Observable<Style[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());     
      return this.http.get<Style[]>(this.apiGetStyles, { params });           
  }
    getStylesByAdmin(page: number, limit: number):Observable<Style[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());     
      return this.http.get<Style[]>(`${this.apiGetStyles}/all/admin`, { params });           
  }
  getDetailStyle(id:number): Observable<Style>{
    return this.http.get<Style>(`${this.apiGetStyles}/${id}`);
  }
  deleteStyle(id:number):Observable<string>{
    return this.http.delete(`${this.apiGetStyles}/${id}`,{responseType:'text'});
  }
  updateStyle(id:number,updateStyle:UpdateStyleDTO):Observable<UpdateStyleDTO>{
    return this.http.put<Style>(`${this.apiGetStyles}/${id}`,updateStyle);
  }
  insertStyle(insertStyleDTO:InsertStyleDTO):Observable<any>{
    return this.http.post(this.apiGetStyles,insertStyleDTO);
  }
    toggleStyleStatus(params: { styleId: number, enable: boolean }): Observable<any> {
    const url = `${this.apiGetStyles}/block/${params.styleId}/${params.enable ? '1' : '0'}`;
     return this.http.put(url, null, {
    ...this.apiConfig,
    responseType: 'text' as 'json'
  });
  }
}