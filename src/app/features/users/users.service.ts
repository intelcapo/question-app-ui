import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserDTO, User } from 'src/app/interfaces';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private currentEndpoint = `${environment.URL_API}/users`

  constructor(private http: HttpClient) { }

  getById(userId: string):Observable<User>{
    const endpointForUser = `${this.currentEndpoint}/${userId}`
    return this.http.get<User>(endpointForUser)
  }

  create(user: CreateUserDTO){
    return this.http.post<User>(this.currentEndpoint, user)
  }
}
