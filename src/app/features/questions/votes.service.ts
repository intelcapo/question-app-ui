import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Question, User, VotesForQuestion, VotesForQuestionDTO } from 'src/app/interfaces';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class VotesService {

  votes:VotesForQuestion[] = []

  private currentEndpoint = `${environment.URL_API}/votes`

  constructor(private http: HttpClient) { }


  getVotesByRoomId(roomId: string): Observable<VotesForQuestion[]>{
    const endpointVotesForRoom = `${this.currentEndpoint}/room/${roomId}`
    return this.http.get<VotesForQuestionDTO[]>(endpointVotesForRoom)
    .pipe(
      map((votes)=> this.formatVotes(votes)),
      tap((votes)=> this.setRoomVotes(votes))
    )
  }

  private formatVotes(votes: VotesForQuestionDTO[]): VotesForQuestion[]{
    return votes.map((vote: VotesForQuestionDTO)=> ({
      questionId: vote.question.id,
      users: vote.users
    }))
  }

  private setRoomVotes(votes: VotesForQuestion[]){
    this.votes = votes
  }

  updateVoteStatus(questions: Question[], user: User): Question[]{
    questions.forEach(question=>{
      question.isVoted = this.isVotedByUser(question.id,user)
    })
    return questions
  }

  private isVotedByUser(questionId:string, user:User){
    let isVoted: boolean = false

    let vote = this.votes.find(voteToFind => voteToFind.questionId == questionId)

    if(vote){
      let userVoted = vote.users.find(usr => usr.id == user.id)
      isVoted = userVoted?true: false
    }
    return isVoted
  }

  addVote(quesionId:string, user: User){
    let indexVote = this.votes.findIndex(vote => vote.questionId == quesionId)
    if(indexVote != -1){
      let isExistingUser = this.getUserByVoteIndex(indexVote, user)
      if(!isExistingUser){
        this.votes[indexVote].users.push(user)
      }
    }
  }

  removeVote(quesionId:string, user: User){
    let indexVote = this.votes.findIndex(vote => vote.questionId == quesionId)
    if(indexVote != -1){
      let isExistingUser = this.getUserByVoteIndex(indexVote, user)
      if(!isExistingUser){
        let userIndex = this.getUserIndexByVote(indexVote, user)
        this.votes[indexVote].users.splice(userIndex,1)
      }
    }
  }

  getUserByVoteIndex(indexVote: number, user: User) {
    return this.votes[indexVote].users.find(usr => usr.id== user.id)
  }

  getUserIndexByVote(indexVote: number, user: User) {
    return this.votes[indexVote].users.findIndex(usr => usr.id== user.id)
  }


  getVotesByQuestionId(questionId: string): VotesForQuestion | undefined{
    let votesForQuestion: VotesForQuestion |  undefined
    votesForQuestion = this.votes.find(vote=> vote.questionId == questionId)
    return votesForQuestion
  }

}
