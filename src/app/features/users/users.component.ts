import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UsersFormComponent } from './users-form/users-form.component';
import { MatButtonModule } from '@angular/material/button';
import { CreateUserDTO, User } from 'src/app/interfaces';
import { UsersService } from './users.service';
import { CoreService } from 'src/app/core/core.service';
import { NavigationService } from 'src/app/core/navigation.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  user: User | null = null

  constructor(
    public dialog: MatDialog,
    private usersService: UsersService,
    private coreService: CoreService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.openDialog()
  }

  openDialog(){
    const dialogRef = this.dialog.open(UsersFormComponent)

    dialogRef.afterClosed().subscribe({
      next: (formData)=>{
        this.validateUserToLog(formData)
      }
    })
  }

  validateUserToLog(user: CreateUserDTO | null){
    if(user){
      let userToCreate: CreateUserDTO = user
      this.usersService.create(userToCreate).subscribe({
        next: (userToLog)=>{
          this.user = userToLog
          this.logUserIntoApplication(this.user)
          this.navigationService.navigateToBeforePath()
        }
      })
    }else{
      const USER_ANONUMOUS_ID = '1'
      this.usersService.getById(USER_ANONUMOUS_ID).subscribe({
        next: (userAnonymous)=>{
          this.user = userAnonymous
          this.logUserIntoApplication(this.user)
          this.navigationService.navigateToBeforePath()
        }
      })
    }
  }

  logUserIntoApplication(user: User){
    this.coreService.setUserLogged(user)
  }
}
