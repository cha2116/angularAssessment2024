import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './Contact_Information/error/error.component';
import { HomeComponent } from './Contact_Information/home/home.component';
import { AddComponent } from './Contact_Information/add/add.component';
import { ViewComponent } from './Contact_Information/view/view.component';
import { ListComponent } from './Contact_Information/list/list.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'list', component: ListComponent },
  { path: 'add', component: AddComponent },
  { path: 'view/:id', component: ViewComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
