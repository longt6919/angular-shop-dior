import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Origin } from "../models/origin";
import { UpdateOriginDTO } from "../dtos/origin/update.origin.dto";
import { InsertOriginlDTO } from "../dtos/origin/insert.origin.dto";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OriginService {
     private apiGetOrigins  = `${environment.apiBaseUrl}/api/v1/origins`;

  constructor(private http: HttpClient) { }

  getOrigins(page: number, limit: number):Observable<Origin[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
      return this.http.get<Origin[]>(this.apiGetOrigins, { params });
  }
  getDetailOrigin(id:number): Observable<Origin>{
    return this.http.get<Origin>(`${this.apiGetOrigins}/${id}`);
  }
  deleteOrigin(id:number):Observable<string>{
    return this.http.delete(`${this.apiGetOrigins}/${id}`,{responseType:'text'});
  }
  updateOrigin(id:number,updateOrigin:UpdateOriginDTO):Observable<UpdateOriginDTO>{
    return this.http.put<Origin>(`${this.apiGetOrigins}/${id}`,updateOrigin);
  }
  insertOrigin(insertOriginlDTO:InsertOriginlDTO):Observable<any>{
    return this.http.post(this.apiGetOrigins,insertOriginlDTO);
  }
}
