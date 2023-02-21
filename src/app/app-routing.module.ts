import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CalendarComponent} from "./components/calendar/calendar.component";
import {AddFormComponent} from "./components/add-form/add-form.component";
import {EditFormComponent} from "./components/edit-form/edit-form.component";

const routes: Routes = [
  { path: 'events', component: CalendarComponent },
  { path: 'events/add', component: AddFormComponent },
  { path: 'events/edit/:id', component: EditFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
