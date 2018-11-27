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
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getCurrentUser();
    this.getPosts();
  }

  checkLike(likeList: []): void {
    console.log(likeList);

    this.photofeedService.checkLike(this.activeUserID, likeList)
            .subscribe(statement => {
              console.log(statement);
            })
  }

  getCurrentUser(): void {
    this.authService.getActiveUser()
        .subscribe(userData => {
          this.activeUserID = userData.id;
        }
        );
  }
  getPosts(): void {
    this.photofeedService.getPosts()
        .subscribe(postData => {
          console.log(postData);
          this.posts = postData;
        });
  }
}
