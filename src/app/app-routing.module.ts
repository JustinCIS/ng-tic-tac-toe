import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicTacToeComponent } from './components/tic-tac-toe/tic-tac-toe.component';

const routes: Routes = [
  //Removed for Github Pages compatibility
  //{ path: '', redirectTo: '/game', pathMatch: 'full' },
  //{ path: 'game', component: TicTacToeComponent }
  { path: '', component: TicTacToeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
