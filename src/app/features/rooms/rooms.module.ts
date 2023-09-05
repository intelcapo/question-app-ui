import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsRoutingModule} from './rooms-routing.module';
import { RoomsComponent } from './rooms.component'
import { MatDividerModule } from '@angular/material/divider';
import { RoomsTemplateComponent } from './rooms-template/rooms-template.component';
import { MatCardModule } from '@angular/material/card';
import { RoomsService } from './rooms.service';


@NgModule({
  declarations: [
    RoomsComponent,
    RoomsTemplateComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    MatCardModule,
    MatDividerModule,
  ],
  providers: [
    RoomsService
  ]
})

export class RoomsModule { }
