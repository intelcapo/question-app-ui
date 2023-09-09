import { Component, OnInit } from '@angular/core';
import { CreateRoomDTO, Room, User } from 'src/app/interfaces';
import { RoomsService } from './rooms.service';
import { CoreService } from '../../core/core.service';
import { NavigationService } from '../../core/navigation.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = []

  user: User | null = null

  constructor(
    private roomsService:RoomsService,
    private coreService: CoreService,
    private navigationService: NavigationService) {

  }

  ngOnInit(): void {
    this.validateUserLogged()
    this.getRoomList()
  }

  validateUserLogged(){
    this.user = this.coreService.getUserLogged()
    if(!this.user){
      this.navigationService.navigateToUsers()
    }
  }

  getRoomList(){
    this.roomsService.getAllRooms().subscribe({
      next: (roomsResponse: Room[])=>{
        this.rooms = roomsResponse
      }, error:()=> {
        this.rooms = []
      }
    })
  }

  handleCreateRoom(roomToCreate: CreateRoomDTO){
    let room: CreateRoomDTO = { ...roomToCreate, user: this.user || {id:'1',name:'Anonimo'}}
    this.roomsService.create(room).subscribe({
      next: (response)=>{

      },
      error: (error)=>{
        console.error(error)
      }, complete: ()=>{
        this.getRoomList()
      }
    })
  }
}
