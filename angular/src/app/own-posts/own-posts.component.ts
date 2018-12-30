import { Post } from './../Post';
import { PhotofeedService } from './../photofeedservice/photofeed.service';
import { AuthService } from './../authservice/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-own-posts',
  templateUrl: './own-posts.component.html',
  styleUrls: ['./own-posts.component.sass']
})
export class OwnPostsComponent implements OnInit {
  userId: number;
  posts: Post[];
  constructor(
    private authService: AuthService,
    private photofeedService: PhotofeedService
  ) { }

  ngOnInit() {
    this.getActiveUser();
  }
  getActiveUser(): void {
    this.authService.getActiveUser()
      .subscribe(userData => {
        this.userId = userData.id;
        this.getOwnPosts();
      });
  }
  getOwnPosts(): void {
    this.photofeedService.filterPostByAuthor(this.userId.toString())
        .subscribe(postData => {
          this.posts = postData;
          this.checkLikes();
        });
  }
  checkLikes(): void {
    const postArray = this.posts;
    const ID = this.userId;
    setTimeout(function() {
      postArray.forEach(element => {
        const heart = document.querySelector(`#heart${element.id}`);
        if (element.acf.likes.indexOf(ID) > -1) {
          heart.classList.remove('far');
          heart.classList.add('fa');
          heart.classList.add('heartColor');
        }
      });
    }, 1000);
  }

  updateLike(likeList, postId): void {
    const heart = document.querySelector(`#heart${postId}`);
    if (likeList !== false) {
      const index = likeList.indexOf(this.userId);
      if (index > -1) {
        likeList.splice(index, 1);
        this.photofeedService.updateLikes(postId, likeList)
          .subscribe(postData => {
                heart.classList.add('far');
                heart.classList.remove('fa');
                heart.classList.remove('heartColor');
            });
      } else {
        likeList.push(this.userId);
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
      likeList.push(this.userId);
      this.photofeedService.updateLikes(postId, likeList)
      .subscribe(postData => {
        heart.classList.remove('far');
        heart.classList.add('fa');
        heart.classList.add('heartColor');
      });
    }
  }
  showPopup(id: number): void {
    const popup = document.getElementById(`myPopup${id}`);
    popup.classList.toggle('show');
  }
  deletePost(id: number): void {
    this.photofeedService.deletePost(id)
        .subscribe(() => {
          this.getOwnPosts();
        });
  }
}
