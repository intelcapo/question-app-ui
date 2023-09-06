export interface User {
  id: string,
  name: string
}

export interface CreateUserDTO extends Omit<User, 'id'>{}
