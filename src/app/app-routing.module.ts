import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/services/auth.guard';

import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { TeamBioComponent } from './components/team-bio/team-bio.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdateRequestComponent } from './components/update-request/update-request.component';
import { UpdateListingComponent } from './components/update-listing/update-listing.component';
import { ProfileEditorComponent } from './components/profile-editor/profile-editor.component';
import { RequestComponent } from './components/request/request.component';
import { ListingComponent } from './components/listing/listing.component';
import { SiteTallyComponent } from './components/site-tally/site-tally.component';
import { ViewListingComponent } from './components/view-listing/view-listing.component';
import { ViewRequestComponent } from './components/view-request/view-request.component';
import { EmailLoginComponent } from './components/email-login/email-login.component';
import { UsernameLoginComponent } from './components/username-login/username-login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

//Protected all the routes with can activate route protection

const routes: Routes = [
   {path: '',  redirectTo: 'city-care/home', pathMatch: 'full' },
   { path: 'city-care/home', component: HomeComponent },
   { path: 'city-care/user-registration', component: RegistrationComponent },
   { path: 'city-care/email-login', component: EmailLoginComponent },
   { path: 'city-care/username-login', component: UsernameLoginComponent },
   { path: 'city-care/about-us', component: TeamBioComponent, canActivate: [AuthGuard] },
   { path: 'city-care/users-profile', component: ProfileComponent, canActivate: [AuthGuard] },
   { path: 'city-care/create-request', component: RequestComponent, canActivate: [AuthGuard] },
   { path: 'city-care/create-listing', component: ListingComponent, canActivate: [AuthGuard] },
   { path: 'city-care/update-request/:id', component: UpdateRequestComponent, canActivate: [AuthGuard] },
   { path: 'city-care/update-listing/:id', component: UpdateListingComponent, canActivate: [AuthGuard] },
   { path: 'city-care/view-listing/:id', component: ViewListingComponent, canActivate: [AuthGuard] },
   { path: 'city-care/view-request/:id', component: ViewRequestComponent, canActivate: [AuthGuard] },
   { path: 'city-care/update-profile/:id', component: ProfileEditorComponent, canActivate: [AuthGuard] },
   { path: 'city-care/site-postings', component: SiteTallyComponent, canActivate: [AuthGuard] },
   { path: '**', redirectTo: 'city-care/404' },
   { path: 'city-care/404', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
