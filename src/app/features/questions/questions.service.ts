import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CreateQuestionDTO, Question } from 'src/app/interfaces';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private currentEndpoint = `${environment.URL_API}/questions`

  /**
   *
   */
  constructor(private http: HttpClient) {

  }

  getAll(): Observable<Question[]> {
      return this.http.get<Question[]>(this.currentEndpoint)
  }

  getQuestionsByRoomId(roomId:string){
    const endpointForRoomQuestions = `${this.currentEndpoint}/${roomId}`
    return this.http.get<Question[]>(endpointForRoomQuestions).pipe(
      map((questions: Question[])=> this.sortQuestionsByVotes(questions))
    )
  }

  private sortQuestionsByVotes(questions: Question[]){
    return questions.sort((a,b)=>{
      if(a.votes > b.votes) {
        return -1
      }else{
        return 1
      }
    })
  }

  create(questionToCreate: CreateQuestionDTO): Observable<Question>{
    return this.http.post<Question>(this.currentEndpoint, questionToCreate)
  }

  addVote(questionId:string): Observable<Question>{
    const endpoitForAddVote = `${this.currentEndpoint}/${questionId}/addVote`
    return this.http.put<Question>(endpoitForAddVote,{id: questionId})
  }

  removeVote(questionId:string): Observable<Question>{
    const endpoitForRemoveVote = `${this.currentEndpoint}/${questionId}/removeVote`
    return this.http.put<Question>(endpoitForRemoveVote,{id: questionId})
  }


}
