import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./dto/user";
import {Observable} from "rxjs";
import {UserCreateDto} from "./dto/user-create.dto";
import {UserUpdateDto} from "./dto/user-update.dto";
import {UserConfirmDto} from "./dto/user-confirm.dto";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = "/api/users";

  constructor(
    private http: HttpClient,
  ) {
  }

  getMe(): Observable<User> {
    return this.http.get<User>(this.baseUrl + "/me");
  }

  confirmUser(userConfirmDto: UserConfirmDto): Observable<User> {
    return this.http.post<User>(this.baseUrl + "/confirm", userConfirmDto);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl)
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`)
  }

  createUser(user: UserCreateDto): Observable<User> {
    return this.http.post<User>(this.baseUrl, user)
  }

  updateUser(id: number, user: UserUpdateDto): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/${id}`, user)
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}/${id}`)
  }
}
