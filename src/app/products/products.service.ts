import {Injectable} from '@angular/core';
import {catchError, Observable} from "rxjs";
import {Product} from "./dto/product";
import {HttpClient} from "@angular/common/http";
import {ProductType} from "../shared/product-type";
import {ProductCreateDto} from "./dto/product-create.dto";
import {ProductUpdateDto} from "./dto/product-update.dto";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = "/api/products";

  constructor(
    private http: HttpClient,
  ) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getProduct(id: number): Observable<Product> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  updateProduct(id: number, product: ProductUpdateDto): Observable<Product> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.patch<Product>(url, product);
  }

  addProduct(product: ProductCreateDto): Observable<Product> {
    let url = `${this.baseUrl}/`;
    return this.http.post<Product>(url, product);
  }

  deleteProduct(id: number): Observable<Product> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url);
  }

  toggleAvailability(product: Product): Observable<Product> {
    let url = `${this.baseUrl}/${product.id}`;
    const dto: ProductUpdateDto = {available: !product.available};
    return this.http.patch<Product>(url, dto);
  }
}
