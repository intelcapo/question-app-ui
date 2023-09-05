import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/interfaces';




@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = []

  constructor() {

  }
  ngOnInit(): void {

  }

  getRoomList(){

  }
}
