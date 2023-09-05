import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsRoutingModule} from './rooms-routing.module';
import { RoomsComponent } from './rooms.component'
import { MatDividerModule } from '@angular/material/divider';
import { RoomsTemplateComponent } from './rooms-template/rooms-template.component';
import { MatCardModule } from '@angular/material/card';
import { RoomsService } from './rooms.service';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { RoomsFormComponent } from './rooms-form/rooms-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLabel } from '@angular/material/form-field';



@NgModule({
  declarations: [
    RoomsComponent,
    RoomsTemplateComponent,
    RoomsFormComponent,
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,

  ],
  providers: [
    RoomsService
  ]
})

export class RoomsModule { }
