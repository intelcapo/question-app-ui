import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent {

  frmUser: FormGroup = this.formBuilder.group({
    name: ''
  })

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UsersFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User) {
  }

  continueAsAnonymous(){
    this.dialogRef.close()
  }

}
