import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { StockChange } from "./dto/stock-change.entity";
import { StockQueryDto } from "./dto/stock-query.dto";
import { QueryService } from "../../features/query.service";

@Injectable({
  providedIn: "root",
})
export class StockService {
  private baseUrl = "/api/stock";

  constructor(
    private http: HttpClient,
    private queryService: QueryService,
  ) {
  }

  getStockChanges(stockQueryDto?: StockQueryDto): Observable<StockChange[]> {
    return this.http.get<StockChange[]>(this.baseUrl, { params: this.queryService.encode(stockQueryDto) });
  }
}
