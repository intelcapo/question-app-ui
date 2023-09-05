import { Room } from "./room"
import { User } from "./user"

export interface Question {
  id: string,
  description: string,
  votes: number,
  creationDate: Date,
  user: User
  room: Room
}

export interface CreateQuestionDTO {
  roomId: string
  userId:string
}
