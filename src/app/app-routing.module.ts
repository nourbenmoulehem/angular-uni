import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SuggestionsListComponent } from './suggestions/suggestions-list/suggestions-list.component';
import { SuggestionDetailComponent } from './suggestions/suggestion-detail/suggestion-detail.component';
import { SuggestionFormComponent } from './suggestions/suggestion-form/suggestion-form.component';
import { LoginComponent } from './auth/auth/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'suggestions', component: SuggestionsListComponent },
  { path: 'suggestions/new', component: SuggestionFormComponent },
  { path: 'suggestions/:id', component: SuggestionDetailComponent },
  { path: 'suggestions/:id/edit', component: SuggestionFormComponent },
  { path: '**', component: NotFoundComponent  } // 404 redirect to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }