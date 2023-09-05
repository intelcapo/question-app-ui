import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question, Room, User } from 'src/app/interfaces';

@Component({
  selector: 'app-questions-template',
  templateUrl: './questions-template.component.html',
  styleUrls: ['./questions-template.component.scss']
})
export class QuestionsTemplateComponent {
  @Input()
  question: Question | null = {
    id: '',
    description: '',
    room:  {
      id: '',
      name: '',
      creationDate: new Date()
    } as Room,
    votes: 0,
    creationDate: new Date(),
    user: {
      id: '',
      name: ''
    } as User
  }

  @Output()
  addVote: EventEmitter<Question> = new EventEmitter<Question>()

  @Output()
  removeVote: EventEmitter<Question> = new EventEmitter<Question>()

  constructor() {

  }

  onAddVote(question: Question){
    this.addVote.emit(question)
  }

  onRemoveVote(question: Question){
    this.removeVote.emit(question)
  }

}
