import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';

const routes: Routes = [{ path: '', component: EventsComponent },
  { path: 'details', component: EventDetailComponent }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
