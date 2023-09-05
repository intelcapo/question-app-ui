import { Component, OnInit } from '@angular/core';
import { CreateRoomDTO, Room } from 'src/app/interfaces';
import { RoomsService } from './rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = []

  constructor(private roomsService:RoomsService) {

  }

  ngOnInit(): void {
    this.getRoomList()
  }

  getRoomList(){
    this.roomsService.getAllRooms().subscribe({
      next: (roomsResponse: Room[])=>{
        console.log(roomsResponse.length)
        this.rooms = roomsResponse
      }, error:()=> {
        this.rooms = []
      }
    })
  }

  onCreateRoom(roomToCreate: CreateRoomDTO){
    this.roomsService.create(roomToCreate).subscribe({
      next: (response)=>{
        console.log(response)
      },
      error: (error)=>{
        console.error(error)
      }, complete: ()=>{
        this.getRoomList()
      }
    })
  }
}
