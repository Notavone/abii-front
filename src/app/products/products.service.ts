import {Injectable} from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {Product} from "./dto/product";
import {HttpClient} from "@angular/common/http";
import {ProductType} from "../shared/product-type";
import {AuthService} from "../auth/auth.service";
import {LoggingService} from "../features/logging.service";
import {ProductCreateDto} from "./dto/product-create.dto";
import {ProductUpdateDto} from "./dto/product-update.dto";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = "/api/products";
  private provider = "ProductsService";

  constructor(private http: HttpClient, private authService: AuthService, private loggingService: LoggingService) {
    this.loggingService.log(this.provider, `init cache`);
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError<Product[]>([]))
      )
  }

  getProduct(id: number): Observable<Product> {
    let defaultResult: Product = {
      id: id,
      name: "(??) Produit inconnu",
      price: 0,
      price_red: 0,
      type: ProductType.PRODUCT_FOOD,
      createdAt: new Date(),
      updatedAt: new Date(),
      available: false
    }

    let url = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(url)
      .pipe(
        catchError(this.handleError<Product>(defaultResult))
      );
  }

  updateProduct(id: number, product: ProductCreateDto): Observable<Product> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.patch<Product>(url, product)
      .pipe(
        catchError(this.handleError<any>())
      );
  }

  addProduct(product: ProductCreateDto): Observable<Product> {
    let url = `${this.baseUrl}/`;
    return this.http.post<Product>(url, product)
      .pipe(
        catchError(this.handleError<any>())
      );
  }

  deleteProduct(id: number): Observable<Product> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url)
      .pipe(
        catchError(this.handleError<any>())
      );
  }

  toggleAvailability(product: Product): Observable<Product> {
    let url = `${this.baseUrl}/${product.id}`;
    const dto: ProductUpdateDto = {available: !product.available};
    return this.http.patch<Product>(url, dto)
      .pipe(
        catchError(this.handleError<any>())
      );
  }
}
