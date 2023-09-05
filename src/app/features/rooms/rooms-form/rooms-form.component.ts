import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreateRoomDTO } from 'src/app/interfaces';

@Component({
  selector: 'app-rooms-form',
  templateUrl: './rooms-form.component.html',
  styleUrls: ['./rooms-form.component.scss']
})
export class RoomsFormComponent {
  /**
   *
   */
  constructor(private formBuilder: FormBuilder) {
  }

  frmRoom: FormGroup = this.formBuilder.group({
    name: ''
  })

  @Output()
  createRoom = new EventEmitter<CreateRoomDTO>()

  onSubmit(){
    this.createRoom.emit(this.frmRoom.value)
  }
}
