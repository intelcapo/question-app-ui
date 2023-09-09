import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from 'src/app/interfaces';

@Component({
  selector: 'app-questions-suggestions',
  templateUrl: './questions-suggestions.component.html',
  styleUrls: ['./questions-suggestions.component.scss']
})
export class QuestionsSuggestionsComponent {
  @Input()
  questionsSuggested: Question[] = []

  @Output()
  addVote: EventEmitter<Question> = new EventEmitter<Question>()

  onAddVote(question: Question){
    this.addVote.emit(question)
    this.questionsSuggested = []
  }
}
