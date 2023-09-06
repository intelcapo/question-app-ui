import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreateQuestionDTO } from 'src/app/interfaces';

@Component({
  selector: 'app-questions-form',
  templateUrl: './questions-form.component.html',
  styleUrls: ['./questions-form.component.scss']
})
export class QuestionsFormComponent {

  isFormInvalid: boolean = true

  frmQuestion: FormGroup = this.formBuilder.group({
    description: ''
  })

  @Output()
  createQuestion: EventEmitter<CreateQuestionDTO> = new EventEmitter<CreateQuestionDTO>()

  constructor(private formBuilder: FormBuilder) {
    this.validateFrom()
  }

  validateFrom(){
    this.frmQuestion.get('description')!.valueChanges.subscribe({
      next: (data)=>{
        this.isFormInvalid = data.toString().trim() == ''
      }
    })
  }

  onSubmit(){
    this.createQuestion.emit(this.frmQuestion.value)
    this.frmQuestion.reset()
    this.isFormInvalid = true
  }

}
