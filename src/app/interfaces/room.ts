import { User } from "./user";

export interface Room {
  id: string,
  name: string,
  creationDate: Date,
  user: User
}


export interface CreateRoomDTO extends Omit<Room, 'id'| 'creationDate' | 'user'> {}
