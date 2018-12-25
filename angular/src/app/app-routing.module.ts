import { PhotofeedAddComponent } from './photofeed-add/photofeed-add.component';
import { QuizComponent } from './quiz/quiz.component';
import { LogoutComponent } from './logout/logout.component';
import { FriendsDetailComponent } from './friends-detail/friends-detail.component';
import { UserstatsComponent } from './userstats/userstats.component';
import { ToolsComponent } from './tools/tools.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { FriendsComponent } from './friends/friends.component';
import { RegisterComponent } from './register/register.component';
import { HomescreenComponent } from './homescreen/homescreen.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotofeedComponent } from './photofeed/photofeed.component';
import { CommentComponent } from './comment/comment.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: UserprofileComponent},
  {path: 'profile/stats/:id', component: UserstatsComponent},
  {path: 'profile/quiz/:id', component: QuizComponent},
  {path: 'home', component: HomescreenComponent},
  {path: 'friends', component: FriendsComponent},
  {path: 'friends/:id', component: FriendsDetailComponent},
  {path: 'tools', component: ToolsComponent},
  {path: 'weeklyhashtag', component: PhotofeedComponent},
  {path: 'weeklyhashtag/add', component: PhotofeedAddComponent},
  {path: 'weeklyhashtag/:id/comments', component: CommentComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
