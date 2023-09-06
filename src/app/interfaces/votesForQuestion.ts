import { Question } from "./question"
import { User } from "./user"

export interface VotesForQuestionDTO {
  question: Question
  users: User[]
}

export interface VotesForQuestion {
  questionId: string
  users: User[]
}
