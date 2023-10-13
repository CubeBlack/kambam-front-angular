import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChecklistComponent } from './page/checklist/checklist.component';
import { BoardComponent } from './page/board/board.component';

const routes: Routes = [
  { path: '', component: ChecklistComponent},
  {path:'checklist', component:ChecklistComponent },
  {path:'board', component:BoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
