import { Component, OnInit } from '@angular/core';
import { CreateQuestionDTO, Question, Room, User } from 'src/app/interfaces';
import { QuestionsService } from './questions.service';
import { ActivatedRoute } from '@angular/router';
import { RoomsService } from '../rooms/rooms.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit{
  questions: Question[] = []
  roomId: string = ''

  currentRoom: Room | null = {
    id: '',
    name: '',
    user: {} as User,
    creationDate: new Date()
  }

  constructor(
    private questionsService: QuestionsService,
    private activatedRoute: ActivatedRoute,
    private roomsService: RoomsService){}

  ngOnInit(): void {
    this.getUrlParams()
    this.getCurrentRoom(this.roomId)
    this.getRoomQuestions(this.roomId)
  }

  getCurrentRoom(roomId: string){
    this.roomsService.getById(roomId).subscribe({
      next: (room: Room)=>{
        this.currentRoom = room
      }
    })
  }

  getUrlParams(){
    this.activatedRoute.params.subscribe({
      next: (params)=>{
        this.roomId = params['roomId']
      }
    })
  }

  getRoomQuestions(roomId:string) {
    this.questionsService.getQuestionsByRoomId(roomId).subscribe({
      next: (questionsResponse)=>{
        this.questions = questionsResponse
      },
      error: ()=>{
        this.questions = []
      }
    })
  }

  handleCreateQuestion(question: CreateQuestionDTO){
    question = {...question, roomId: this.roomId, userId: '1'}
    this.questionsService.create(question).subscribe({
      next: (createQuestionsResponse)=>{
        console.log(`Question created`)
      },
      error: ()=>{
        this.questions = []
      },
      complete: ()=>{
        this.getRoomQuestions(this.roomId)
      }
    })
  }

  handleAddVote(question: Question){
    this.questionsService.addVote(question.id).subscribe({
      next: ()=>{
        console.log('Question Updated')
      },
      error: (error)=>{
          console.error(error.error)
      },
      complete: ()=>{
        this.getRoomQuestions(this.roomId)
      }
    })
  }

  handleRemoveVote(question: Question){
    this.questionsService.removeVote(question.id).subscribe({
      next: ()=>{
        console.log('Question Updated')
      },
      error: (error)=>{
        console.error(error.error)
      },
      complete: ()=>{
        this.getRoomQuestions(this.roomId)
      }
    })
  }

}
