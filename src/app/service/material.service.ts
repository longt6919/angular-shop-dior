import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Material } from "../models/material";
import { UpdateMaterialDTO } from "../dtos/material/update.material.dto";
import { InsertMaterialDTO } from "../dtos/material/insert.material.dto";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
     private apiMaterials  = `${environment.apiBaseUrl}/api/v1/material`;

  constructor(private http: HttpClient) { }
  getMaterials(page: number, limit: number):Observable<Material[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
      return this.http.get<Material[]>(this.apiMaterials, { params });
  }
  getDetailMaterial(id:number): Observable<Material>{
    return this.http.get<Material>(`${this.apiMaterials}/${id}`);
  }
  deleteMaterial(id:number):Observable<string>{
    return this.http.delete(`${this.apiMaterials}/${id}`,{responseType:'text'});
  }
  updateMaterial(id:number,updateMaterial:UpdateMaterialDTO):Observable<UpdateMaterialDTO>{
    return this.http.put<Material>(`${this.apiMaterials}/${id}`,updateMaterial);
  }
  insertMaterial(insertMaterialDTO:InsertMaterialDTO):Observable<any>{
    return this.http.post(this.apiMaterials,insertMaterialDTO);
  }
}
