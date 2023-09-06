import { Component, OnInit } from '@angular/core';
import { CreateQuestionDTO, Question, Room, User, VotesForQuestion } from 'src/app/interfaces';
import { QuestionsService } from './questions.service';
import { ActivatedRoute } from '@angular/router';
import { RoomsService } from '../rooms/rooms.service';
import { CoreService } from 'src/app/core/core.service';
import { NavigationService } from 'src/app/core/navigation.service';
import { VotesService } from './votes.service';

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

  user: User| null = null

  questionSelected: Question | null = null

  votesForQuestion: VotesForQuestion | undefined

  isUsersPanelActive: boolean = false

  constructor(
    private questionsService: QuestionsService,
    private activatedRoute: ActivatedRoute,
    private roomsService: RoomsService,
    private coreService: CoreService,
    private navigationService: NavigationService,
    private votesService: VotesService){}


  ngOnInit(): void {
    this.validateUserLogged()
    this.getUrlParams()
    this.getCurrentRoom(this.roomId)
    this.getRoomQuestions(this.roomId)
  }

  validateUserLogged(){
    this.user = this.coreService.getUserLogged()
    if(!this.user){
      this.navigationService.navigateToUsers()
    }
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
        this.validateRoomVotes(this.questions)
      },
      error: ()=>{
        this.questions = []
      }
    })
  }

  validateRoomVotes(currentQuestions:Question[]){
    this.votesService.getVotesByRoomId(this.roomId).subscribe({
      next: ()=>{
        this.questions = this.votesService.updateVoteStatus(currentQuestions,this.user!)

      }
    })
  }

  handleCreateQuestion(question: CreateQuestionDTO){
    question = {...question, roomId: this.roomId, user: this.user || {id:'1',name:'Anonimo'}}
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
    this.questionsService.addVote(question.id, this.user!).subscribe({
      next: ()=>{
        this.votesService.addVote(question.id, this.user!)
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
    this.questionsService.removeVote(question.id, this.user!).subscribe({
      next: ()=>{
        this.votesService.removeVote(question.id, this.user!)
      },
      error: (error)=>{
        console.error(error.error)
      },
      complete: ()=>{
        this.getRoomQuestions(this.roomId)
      }
    })
  }

  showUsersPanel(question: Question){
    this.isUsersPanelActive = true
    this.questionSelected = question
    this.votesForQuestion = this.votesService.getVotesByQuestionId(question.id)
  }

  closeUsersPanel(){
    this.isUsersPanelActive = false
    this.questionSelected = null
    this.votesForQuestion = undefined
  }

}
