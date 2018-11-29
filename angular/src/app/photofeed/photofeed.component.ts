import { MessageService } from './../messageService/message.service';
import { AuthService } from './../authservice/auth.service';
import { PhotofeedService } from './../photofeedservice/photofeed.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../Post';

@Component({
  selector: 'app-photofeed',
  templateUrl: './photofeed.component.html',
  styleUrls: ['./photofeed.component.sass']
})
export class PhotofeedComponent implements OnInit {
  posts: Post[];
  activeUserID: number;
  constructor(
    private photofeedService: PhotofeedService,
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getCurrentUser();
    this.getPosts();
  }
  checkLike(likeList, postId): void {
    if (likeList !== false) {
      const index = likeList.indexOf(this.activeUserID);
      if (index > -1) {
        likeList.splice(index, 1);
        this.photofeedService.updateLikes(postId, likeList)
            .subscribe(postData => {
              console.log(postData);
            });
        console.log('whaddup');
      } else {
        likeList.push(this.activeUserID);
        this.photofeedService.updateLikes(postId, likeList)
            .subscribe(
              postData => {
                console.log(postData);
              });
      }
    } else {
      likeList = [];
      likeList.push(this.activeUserID);
      console.log(likeList);
    }
  }
  getCurrentUser(): void {
    this.authService.getActiveUser()
        .subscribe(userData => {
          this.activeUserID = userData.id;
        });
  }
  getPosts(): void {
    this.photofeedService.getPosts()
        .subscribe(postData => {
          this.posts = postData;
        });
  }
}
