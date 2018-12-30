import { TrustHtmlPipe, SplitPipe } from './pipeService/pipe.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleChartsModule } from 'angular-google-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomescreenComponent } from './homescreen/homescreen.component';
import { PhotofeedComponent } from './photofeed/photofeed.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FriendsComponent } from './friends/friends.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { ToolsComponent } from './tools/tools.component';
import { UserstatsComponent } from './userstats/userstats.component';
import { FriendsDetailComponent } from './friends-detail/friends-detail.component';
import { LogoutComponent } from './logout/logout.component';
import { QuizComponent } from './quiz/quiz.component';
import { PhotofeedAddComponent } from './photofeed-add/photofeed-add.component';
import { CommentComponent } from './comment/comment.component';
import { OwnPostsComponent } from './own-posts/own-posts.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomescreenComponent,
    PhotofeedComponent,
    FriendsComponent,
    UserprofileComponent,
    ToolsComponent,
    UserstatsComponent,
    FriendsDetailComponent,
    LogoutComponent,
    SplitPipe,
    TrustHtmlPipe,
    QuizComponent,
    PhotofeedAddComponent,
    CommentComponent,
    OwnPostsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    GoogleChartsModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
