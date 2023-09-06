import { Injectable } from '@angular/core';
import { USER_KEYS } from '../constants/keys';
import { User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  constructor() { }

  getUserLogged(): User | null{
    let userToReturn : User | null = null
    let userLogged = window.sessionStorage.getItem(USER_KEYS.userLogged)
    if(userLogged){
      userToReturn = JSON.parse(userLogged)
    }
    return userToReturn
  }

  setUserLogged(user: User){
    window.sessionStorage.setItem(USER_KEYS.userLogged,JSON.stringify(user))
  }
}
