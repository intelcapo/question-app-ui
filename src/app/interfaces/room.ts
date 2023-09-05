import { User } from "./user";

export interface Room {
  id: string,
  name: string,
  creationDate: Date,
  user: User
}
