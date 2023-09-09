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
import { MatBadgeModule } from '@angular/material/badge';
import { QuestionsUsersComponent } from './questions-users/questions-users.component'
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import { QuestionsSuggestionsComponent } from './questions-suggestions/questions-suggestions.component';


@NgModule({
  declarations: [
    QuestionsComponent,
    QuestionsFormComponent,
    QuestionsTemplateComponent,
    QuestionsUsersComponent,
    QuestionsSuggestionsComponent
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
    MatBadgeModule,
    MatTabsModule,
    MatDialogModule
  ]
})
export class QuestionsModule { }
