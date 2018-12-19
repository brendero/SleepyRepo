import { CommentService } from './../commentservice/comment.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.sass']
})
export class CommentComponent implements OnInit {
  comments: Comment[];
  commentValue: string;
  postedComment: Comment;
  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getComments();
  }

  goBack(): void {
    this.location.back();
  }

  getComments(): void {
    const id = + this.route.snapshot.paramMap.get('id');

    this.commentService.getCommentsByPostId(id)
        .subscribe(commentsData => {
          console.log(commentsData);
          this.comments = commentsData;
        });
  }

  // postComment(): void {
  //   const id = +this.route.snapshot.paramMap.get('id');
  //   this.postedComment = new Comment();
  //   this.commentService.postComment(id, this.postedComment)
  //       .subscribe(comment => {
  //         console.log(comment);
  //       });
  // }
}
