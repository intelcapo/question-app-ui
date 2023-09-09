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

  isAlreadyVoted: boolean = false

  @Input()
  isRoomOwnerLogged: boolean = false

  @Output()
  addVote: EventEmitter<Question> = new EventEmitter<Question>()

  @Output()
  removeVote: EventEmitter<Question> = new EventEmitter<Question>()

  @Output()
  openUserPanel: EventEmitter<boolean> = new EventEmitter<boolean>()

  @Output()
  answerQuestion: EventEmitter<Question> = new EventEmitter<Question>()

  get isVoted(){
    return this.question?.isVoted
  }

  constructor() {

  }

  onAddVote(question: Question){
    this.isAlreadyVoted = true
    this.addVote.emit(question)
  }

  onRemoveVote(question: Question){
    this.isAlreadyVoted = false
    this.removeVote.emit(question)
  }

  onOpenUserPane(){
    this.openUserPanel.emit()
  }

  onAnswer(question: Question){
    this.answerQuestion.emit(question)
  }

}
