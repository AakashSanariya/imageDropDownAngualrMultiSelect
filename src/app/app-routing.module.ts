import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImageListComponent} from "./Views/image-list/image-list.component";
import {SelectedUserComponent} from "./Views/selected-user/selected-user.component";


const routes: Routes = [
  {path: 'user', component: ImageListComponent},
  {path: 'selecteduser', component: SelectedUserComponent},
  {path: '', redirectTo: '/user', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
