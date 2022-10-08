import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WhackAMoleComponent } from './components/whack-a-mole/whack-a-mole.component';

const routes: Routes = [
  {path:"", component:WhackAMoleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
