import { Room } from "./room"
import { User } from "./user"

export interface Question {
  id: string,
  description: string,
  votes: number,
  creationDate: Date,
  user: User
  room: Room
  isVoted? : boolean
}

export interface CreateQuestionDTO extends Omit<Question,'id' |'creationDate' | 'votes'>{
  roomId: string

}
