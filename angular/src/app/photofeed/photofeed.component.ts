import { element } from 'protractor';
import { MessageService } from './../messageService/message.service';
import { AuthService } from './../authservice/auth.service';
import { PhotofeedService } from './../photofeedservice/photofeed.service';
import { Component, OnInit, AfterContentInit, AfterViewInit, AfterViewChecked } from '@angular/core';
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

  updateLike(likeList, postId): void {
    const heart = document.querySelector(`#heart${postId}`);
    if (likeList !== false) {
      const index = likeList.indexOf(this.activeUserID);
      if (index > -1) {
        likeList.splice(index, 1);
        this.photofeedService.updateLikes(postId, likeList)
          .subscribe(postData => {
              console.log(postData);
                heart.classList.add('far');
                heart.classList.remove('fa');
                heart.classList.remove('heartColor');
            });
        console.log('whaddup');
      } else {
        likeList.push(this.activeUserID);
        this.photofeedService.updateLikes(postId, likeList)
            .subscribe(
              postData => {
                console.log(postData);
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
        console.log(postData);
        heart.classList.remove('far');
        heart.classList.add('fa');
        heart.classList.add('heartColor');
      });
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
          this.checkLikes();
        });
  }
  checkLikes(): void {
    // TODO: make this work
    const postArray = this.posts;
    const ID = this.activeUserID;
    setTimeout(function() {
      postArray.forEach(el => {
        const heart = document.querySelector(`#heart${el.id}`);
        if (el.acf.likes.indexOf(ID) > -1) {
          heart.classList.remove('far');
          heart.classList.add('fa');
          heart.classList.add('heartColor');
        }
    }, 1000);
    });
  }
}
