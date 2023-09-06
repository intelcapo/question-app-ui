import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question, VotesForQuestion } from 'src/app/interfaces';

@Component({
  selector: 'app-questions-users',
  templateUrl: './questions-users.component.html',
  styleUrls: ['./questions-users.component.scss']
})
export class QuestionsUsersComponent {
  @Input()
  question: Question |  null =  null

  @Input()
  votes: VotesForQuestion |  undefined

  @Output()
  userPanelClose: EventEmitter<boolean> = new EventEmitter<boolean>()

  closePanel(){
    this.userPanelClose.emit(true)
  }
}
