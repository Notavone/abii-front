import {Injectable} from '@angular/core';
import {catchError, map, Observable, of} from "rxjs";
import {Product} from "./product";
import {HttpClient} from "@angular/common/http";
import {Response} from "../../shared/response";
import {ProductType} from "./product-type";
import {AuthService} from "../../auth/shared/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = "http://localhost:3000/api/products";

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Response<Product[]>>(this.baseUrl, this.authService.httpOptions())
      .pipe(
        map(r => r.data),
        catchError(this.handleError<Product[]>([]))
      )
  }

  getProduct(id: string): Observable<Product> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.get<Response<Product>>(url, this.authService.httpOptions())
      .pipe(
        map(r => r.data),
        catchError(this.handleError<Product>({
          _id: "",
          name: "(??) Produit inconnu",
          price: 0,
          discount: 0,
          type: ProductType.PRODUCT_FOOD,
          available: false
        }))
      );
  }

  updateProduct(product: Product): Observable<Product> {
    let url = `${this.baseUrl}/${product._id}`;
    return this.http.patch<Response<Product>>(url, product, this.authService.httpOptions())
      .pipe(
        map(r => r.data),
        catchError(this.handleError<any>())
      );
  }

  addProduct(product: Product): Observable<Product> {
    let url = `${this.baseUrl}/${product._id}`;
    return this.http.post<Response<Product>>(url, product, this.authService.httpOptions())
      .pipe(
        map(r => r.data),
        catchError(this.handleError<any>())
      );
  }

  deleteProduct(product: Product): Observable<Product> {
    let url = `${this.baseUrl}/${product._id}`;
    return this.http.delete<Response<Product>>(url, this.authService.httpOptions())
      .pipe(
        map(r => r.data),
        catchError(this.handleError<any>())
      );
  }

  toggleAvailability(product: Product): Observable<Product> {
    let url = `${this.baseUrl}/${product._id}/available`;
    return this.http.patch<Response<Product>>(url, {}, this.authService.httpOptions())
      .pipe(
        map(r => r.data),
        catchError(this.handleError<any>())
      );
  }
}
