import {Injectable} from '@angular/core';
import {catchError, map, Observable, of, tap} from "rxjs";
import {Product} from "./product";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "../../shared/message.service";
import {Response} from "../../shared/response";
import {ProductType} from "./product-type";
import {AuthService} from "../../auth/shared/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = "http://localhost:3000/api/products";

  constructor(private messageService: MessageService, private http: HttpClient, private authService: AuthService) {
  }

  private log(message: string) {
    this.messageService.add(`ProductService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Response<Product[]>>(this.baseUrl, this.authService.httpOptions())
      .pipe(
        map(r => r.data),
        tap(_ => this.log("fetched products")),
        catchError(this.handleError<Product[]>("getAll", []))
      )
  }

  getProduct(id: string): Observable<Product> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.get<Response<Product>>(url, this.authService.httpOptions())
      .pipe(
        map(r => r.data),
        tap(_ => this.log(`fetched product id=${id}`)),
        catchError(this.handleError<Product>("get", {
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
        tap(_ => this.log(`updated product id=${product._id}`)),
        catchError(this.handleError<any>("update"))
      );
  }

  addProduct(product: Product): Observable<Product> {
    let url = `${this.baseUrl}/${product._id}`;
    return this.http.post<Response<Product>>(url, product, this.authService.httpOptions())
      .pipe(
        map(r => r.data),
        tap(_ => this.log(`created new product`)),
        catchError(this.handleError<any>("create"))
      );
  }

  deleteProduct(product: Product): Observable<Product> {
    let url = `${this.baseUrl}/${product._id}`;
    return this.http.delete<Response<Product>>(url, this.authService.httpOptions())
      .pipe(
        map(r => r.data),
        tap(_ => this.log(`deleted product id=${product._id}`)),
        catchError(this.handleError<any>("delete"))
      );
  }

  toggleAvailability(product: Product): Observable<Product> {
    let url = `${this.baseUrl}/${product._id}/available`;
    return this.http.patch<Response<Product>>(url, {}, this.authService.httpOptions())
      .pipe(
        map(r => r.data),
        tap(_ => this.log(`toggle availability for product=${product._id}`)),
        catchError(this.handleError<any>("toggleAvailability"))
      );
  }
}
