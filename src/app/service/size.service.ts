import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Size } from "../models/size";
import { Observable } from "rxjs";

@Injectable({ 
  providedIn: 'root'
})
export class SizeService {
     private apiGetSize  = `http://localhost:8080/api/v1/size`;

  constructor(private http: HttpClient) { }
  getSizes():Observable<Size[]> {
  return this.http.get<Size[]>(this.apiGetSize);
  }
  getDetailSize(id:number): Observable<Size>{
    return this.http.get<Size>(`${this.apiGetSize}/${id}`);
  }
}