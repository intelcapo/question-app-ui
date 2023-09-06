import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsModule } from './features/questions/questions.module';

const routes: Routes = [
  {
    path: 'rooms',
    loadChildren: ()=> import('./features/rooms/rooms.module').then(mdl => mdl.RoomsModule)
  },
  {
    path: 'questions',
    loadChildren: ()=> import('./features/questions/questions.module').then(mdl => mdl.QuestionsModule)
  },
  {
    path: 'users',
    loadChildren: ()=> import('./features/users/users.module').then(mdl => mdl.UsersModule)
  },
  {
    path: '',
    redirectTo: '/rooms',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
