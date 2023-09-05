import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateRoomDTO, Room } from 'src/app/interfaces';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private currentEndpoint = `${environment.URL_API}/rooms`

  constructor( private http: HttpClient ) { }

  getAllRooms():Observable<Room[]>{
    return this.http.get<Room[]>(this.currentEndpoint)
  }

  create(room: CreateRoomDTO): Observable<any>{
    return this.http.post<any>(this.currentEndpoint,room)
  }

  getById(roomId: string){
    const endpointRoomById = `${this.currentEndpoint}/${roomId}`
    return this.http.get<Room>(endpointRoomById)
  }
}
