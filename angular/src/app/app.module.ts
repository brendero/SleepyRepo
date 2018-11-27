import { TrustHtmlPipe, SplitPipe } from './pipeService/pipe.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
    TrustHtmlPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
