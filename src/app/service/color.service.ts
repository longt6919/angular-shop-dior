import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Size } from "../models/size";
import { Observable } from "rxjs";
import { Color } from "../models/color";
import { UpdateColorDTO } from "../dtos/color/update.color.dto";
import { InsertColorlDTO } from "../dtos/color/insert.color.dto";

@Injectable({ 
  providedIn: 'root'
})
export class ColorService {
     private apiGetColor  = `http://localhost:8080/api/v1/color`;

  constructor(private http: HttpClient) { }
  getColors():Observable<Color[]> {
  return this.http.get<Size[]>(this.apiGetColor);
  }
  getAdminColors(page: number, limit: number):Observable<Color[]> {
      const params = new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString());     
        return this.http.get<Color[]>(this.apiGetColor, { params });           
  }
  getDetailColor(id:number): Observable<Color>{
    return this.http.get<Color>(`${this.apiGetColor}/${id}`);
  }
    updateColor(id:number,updateColor:UpdateColorDTO):Observable<UpdateColorDTO>{
      return this.http.put<Color>(`${this.apiGetColor}/${id}`,updateColor);
    }
    insertColor(insertColorDTO:InsertColorlDTO):Observable<any>{
      return this.http.post(this.apiGetColor,insertColorDTO);
    }
  }
