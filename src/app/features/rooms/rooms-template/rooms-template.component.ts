import { Component, Input } from '@angular/core';
import { Room } from 'src/app/interfaces'

@Component({
  selector: 'app-rooms-template',
  templateUrl: './rooms-template.component.html',
  styleUrls: ['./rooms-template.component.scss']
})
export class RoomsTemplateComponent {
  @Input()
  room: Room | null =  {
    id: '',
    name: '',
    creationDate: new Date(),
    user: {
      id: '',
      name: ''
    }
  }
}
