import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateQuestionDTO, Question, Room, User, VotesForQuestion } from 'src/app/interfaces';
import { QuestionsService } from './questions.service';
import { ActivatedRoute } from '@angular/router';
import { RoomsService } from '../rooms/rooms.service';
import { CoreService } from 'src/app/core/core.service';
import { NavigationService } from 'src/app/core/navigation.service';
import { VotesService } from './votes.service';
import { MatDialog } from '@angular/material/dialog';
import { QuestionsUsersComponent } from './questions-users/questions-users.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnDestroy{
  questions: Question[] = []

  questionsWithoutAnswer: Question[] = []

  questionsAnswered: Question[] = []

  questionsSuggested: Question[] = []

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

  questionsInterval: any

  roomOwner: User | null= null

  currentUser: User | null = null

  isRoomOwnerLogged: boolean = false

  constructor(
    private questionsService: QuestionsService,
    private activatedRoute: ActivatedRoute,
    private roomsService: RoomsService,
    private coreService: CoreService,
    private navigationService: NavigationService,
    private votesService: VotesService,
    public dialog: MatDialog,){}


  ngOnInit(): void {
    this.validateUserLogged()
    this.getUrlParams()
    this.getCurrentRoom(this.roomId)
    this.getRoomQuestions(this.roomId)
    this.createIntervalToGetQuestions()
  }


  createIntervalToGetQuestions(){
    this.questionsInterval = setInterval(()=>{
      this.getRoomQuestions(this.roomId)
    }, 30000)
  }

  ngOnDestroy(): void {
    clearInterval(this.questionsInterval)
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
        this.getRoomOwner()
        this.getCurrentUser()
        this.validateRoomOwner()
      }
    })
  }

  getRoomOwner(){
    this.roomOwner = this.currentRoom?.user!
  }

  getCurrentUser(){
    this.currentUser = this.coreService.getUserLogged()
  }

  validateRoomOwner(){
    this.isRoomOwnerLogged = this.roomOwner?.id == this.currentUser?.id
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
        this.questionsAnswered = this.getQuestionsAnswered([...this.questions])
        this.questionsWithoutAnswer = this.getQuestionsWithoutAnswer([...this.questions])
      },
      error: ()=>{
        this.questions = []
      }
    })
  }

  getQuestionsAnswered(questions: Question[]){
    return questions.filter(question => question.isAnswered == true)
  }

  getQuestionsWithoutAnswer(questions: Question[]){
    return questions.filter(question => question.isAnswered == false)
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

        this.questionsSuggested= []
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
        this.questionsSuggested = []
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
    this.dialog.open(QuestionsUsersComponent, {data:  {...question}})
  }

  closeUsersPanel(){
    this.isUsersPanelActive = false
    this.questionSelected = null
    this.votesForQuestion = undefined
  }


  handleAnswer(question: Question){
    this.questionsService.answer(question.id).subscribe({
      next: (question)=>{

      },
      error: (error)=>{
        console.error(error.error)
      },
      complete: ()=>{
        this.getRoomQuestions(this.roomId)
      }
    })
  }

  handleQuestionFilter(termsToFilter: string[]){
    this.questionsSuggested = []
    this.questions.forEach(question =>{
      for (const termToSearch of termsToFilter) {
        if(question.description.toLowerCase().includes(termToSearch.toLowerCase())){
          this.questionsSuggested.push(question)
          break
        }
      }
    })
  }

  getArrayOfTerms(questionDescription: string): string[]{
    return questionDescription.split(' ')
  }


}
