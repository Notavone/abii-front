import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Ean } from "./dto/ean.entity";
import { EanUpdateDto } from "./dto/ean-update.dto";
import { EanCreateDto } from "./dto/ean-create.dto";
import { EanResolvable } from "./dto/EanResolvable";

@Injectable({
  providedIn: "root",
})
export class EanService {
  private baseUrl = "/api/ean";

  constructor(
    private http: HttpClient,
  ) {
  }

  getEans(): Observable<Ean[]> {
    return this.http.get<Ean[]>(this.baseUrl);
  }

  createEan(eanCreateDto: EanCreateDto): Observable<Ean> {
    return this.http.post<Ean>(this.baseUrl, eanCreateDto);
  }

  updateEan(id: number, eanUpdateDto: EanUpdateDto): Observable<Ean> {
    return this.http.patch<Ean>(this.baseUrl + "/" + id, eanUpdateDto);
  }

  deleteEan(id: number): Observable<Ean> {
    return this.http.delete<Ean>(this.baseUrl + "/" + id);
  }

  getEanById(id: number): Observable<Ean> {
    let params = new HttpParams({ fromObject: { mode: EanResolvable.ID } });
    return this.http.get<Ean>(this.baseUrl + "/" + id, { params });
  }

  getEanByValue(value: string): Observable<Ean> {
    let params = new HttpParams({ fromObject: { mode: EanResolvable.VALUE } });
    return this.http.get<Ean>(this.baseUrl + "/" + value, { params });
  }
}
