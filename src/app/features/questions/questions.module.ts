import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsModuleRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';
import { QuestionsFormComponent } from './questions-form/questions-form.component';
import { QuestionsTemplateComponent } from './questions-template/questions-template.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatBadgeModule } from '@angular/material/badge'



@NgModule({
  declarations: [
    QuestionsComponent,
    QuestionsFormComponent,
    QuestionsTemplateComponent
  ],
  imports: [
    CommonModule,
    QuestionsModuleRoutingModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    MatBadgeModule
  ]
})
export class QuestionsModule { }
