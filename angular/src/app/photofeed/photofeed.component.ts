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
  userFriends: any;
  constructor(
    private photofeedService: PhotofeedService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  updateLike(likeList, postId): void {
    const heart = document.querySelector(`#heart${postId}`);
    if (likeList !== false) {
      const index = likeList.indexOf(this.activeUserID);
      if (index > -1) {
        likeList.splice(index, 1);
        this.photofeedService.updateLikes(postId, likeList)
          .subscribe(postData => {
                heart.classList.add('far');
                heart.classList.remove('fa');
                heart.classList.remove('heartColor');
            });
      } else {
        likeList.push(this.activeUserID);
        this.photofeedService.updateLikes(postId, likeList)
            .subscribe(
              postData => {
                heart.classList.remove('far');
                heart.classList.add('fa');
                heart.classList.add('heartColor');
              });
      }
    } else {
      likeList = [];
      likeList.push(this.activeUserID);
      this.photofeedService.updateLikes(postId, likeList)
      .subscribe(postData => {
        heart.classList.remove('far');
        heart.classList.add('fa');
        heart.classList.add('heartColor');
      });
    }
  }
  getCurrentUser(): void {
    this.authService.getActiveUser()
        .subscribe(userData => {
          this.activeUserID = userData.id;
          this.userFriends = userData.acf.friends;
          this.getPosts();
        });
  }
  getPosts(): void {
    this.photofeedService.filterPostByAuthor(this.userFriends.toString())
        .subscribe(postData => {
          this.posts = postData;
            this.checkLikes();
        });
  }
  checkLikes(): void {
    const postArray = this.posts;
    const ID = this.activeUserID;
    setTimeout(function() {
      postArray.forEach(element => {
        console.log(element);
        const heart = document.querySelector(`#heart${element.id}`);
        if (element.acf.likes.indexOf(ID) > -1) {
          console.log(heart);
          heart.classList.remove('far');
          heart.classList.add('fa');
          heart.classList.add('heartColor');
        }
      });
    }, 1000);
  }

}
