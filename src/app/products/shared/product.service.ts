import {Injectable} from '@angular/core';
import {catchError, map, Observable, of, tap} from "rxjs";
import {Product} from "./product";
import {HttpClient} from "@angular/common/http";
import {Response} from "../../shared/response";
import {ProductType} from "./product-type";
import {AuthService} from "../../auth/shared/auth.service";
import {LoggingService} from "../../shared/logging.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = environment.url + "/products";
  private provider = "ProductService";
  private cache: Map<string, Product> = new Map();

  constructor(private http: HttpClient, private authService: AuthService, private loggingService: LoggingService) {
    this.loggingService.log(this.provider, `init cache`);
  }

  set(product: Product) {
    this.loggingService.log(this.provider, `set cache for id=${product._id}`);
    this.cache.set(product._id, product);
  }

  delete(product: Product) {
    this.loggingService.log(this.provider, `delete cache for id=${product._id}`);
    this.cache.set(product._id, product);
  }

  private handleError<T>(result?: T, errorProduct?: Product) {
    return (error: any): Observable<T> => {
      if (errorProduct) this.cache.set(errorProduct._id, errorProduct);
      console.error(error);
      return of(result as T);
    };
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Response<Product[]>>(this.baseUrl)
      .pipe(
        map(r => r.data.map(p => this.cache.has(p._id) ? this.cache.get(p._id)! : p)),
        tap(products => {
          for (let product of products) {
            if(!this.cache.has(product._id)) this.set(product);
          }
        }),
        catchError(this.handleError<Product[]>([]))
      )
  }

  getProduct(id: string): Observable<Product> {
    let existing = this.cache.get(id);
    if (existing) return of(existing);

    let defaultResult = {
      _id: id,
      name: "(??) Produit inconnu",
      price: 0,
      price_red: 0,
      type: ProductType.PRODUCT_FOOD,
      available: false
    };

    let url = `${this.baseUrl}/${id}`;
    return this.http.get<Response<Product>>(url)
      .pipe(
        map(r => r.data),
        tap(product => this.set(product)),
        catchError(this.handleError<Product>(defaultResult, defaultResult))
      );
  }

  updateProduct(product: Product): Observable<Product> {
    let url = `${this.baseUrl}/${product._id}`;
    return this.http.patch<Response<Product>>(url, product)
      .pipe(
        map(r => r.data),
        tap(product => this.set(product)),
        catchError(this.handleError<any>())
      );
  }

  addProduct(product: Product): Observable<Product> {
    let url = `${this.baseUrl}/${product._id}`;
    return this.http.post<Response<Product>>(url, product)
      .pipe(
        map(r => r.data),
        tap(product => this.set(product)),
        catchError(this.handleError<any>())
      );
  }

  deleteProduct(product: Product): Observable<Product> {
    let url = `${this.baseUrl}/${product._id}`;
    return this.http.delete<Response<Product>>(url)
      .pipe(
        map(r => r.data),
        tap(() => this.delete(product)),
        catchError(this.handleError<any>())
      );
  }

  toggleAvailability(product: Product): Observable<Product> {
    let url = `${this.baseUrl}/${product._id}/available`;
    return this.http.patch<Response<Product>>(url, {})
      .pipe(
        map(r => r.data),
        tap(product => this.set(product)),
        catchError(this.handleError<any>())
      );
  }
}
