import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    this.validateForm()
  }


  frmRoom: FormGroup = this.formBuilder.group({
    name: '',
  })

  isFormInvalid: boolean = true

  @Output()
  createRoom = new EventEmitter<CreateRoomDTO>()


  validateForm(){
    return this.frmRoom.get('name')?.valueChanges.subscribe((data)=>{
      this.isFormInvalid = data.trim() == '' ? true: false
    })
  }

  onSubmit(){
    this.createRoom.emit(this.frmRoom.value)
    this.resetForm()
  }

  resetForm(){
    this.frmRoom.reset()
    this.isFormInvalid = true
  }
}
