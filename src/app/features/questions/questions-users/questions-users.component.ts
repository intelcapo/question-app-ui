import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Question, User, VotesForQuestion } from 'src/app/interfaces';
import { VotesService } from '../votes.service';

interface DialogData {
  question: Question
}
@Component({
  selector: 'app-questions-users',
  templateUrl: './questions-users.component.html',
  styleUrls: ['./questions-users.component.scss']
})
export class QuestionsUsersComponent implements OnInit {
  question: Question | null = null

  @Input()
  votes: VotesForQuestion |  undefined

  @Output()
  userPanelClose: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(
    public dialogRef: MatDialogRef<QuestionsUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private votesService: VotesService){}

  ngOnInit(): void {
    this.question = this.data
    this.getVotes(this.question?.id!)
  }

  getVotes(questionId: string){
    this.votes = this.votesService.getVotesByQuestionId(questionId)
  }

  closePanel(){
    this.dialogRef.close()
  }
}
