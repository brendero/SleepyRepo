import { Post } from './../Post';
import { FileReaderService } from './../fileReaderService/file-reader.service';
import { PhotofeedService } from './../photofeedservice/photofeed.service';
import { MediaService } from './../mediaService/media.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-photofeed-add',
  templateUrl: './photofeed-add.component.html',
  styleUrls: ['./photofeed-add.component.sass']
})
export class PhotofeedAddComponent implements OnInit {
  description: string;
  featuredImage: number;
  newPost: Post;
  imageAttachment: File;
  previewImg: any;
  fileName: string;
  hashtag: number;
  tags: any;
  constructor(
    private mediaService: MediaService,
    private photofeedService: PhotofeedService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getHashes();
  }
  getHashes(): void {
    this.photofeedService.getHashTags()
        .subscribe(hash => {
          this.tags = hash;
        });
  }
  postSubmit(): void {
    // first make a featured image using the picture value
    const formData = new FormData();
    formData.append('file', this.imageAttachment);
    this.mediaService.createFeatured(formData)
        .subscribe(imgData => {
          this.featuredImage = imgData.id;
          this.makeNewPost();
        });
    }
    makeNewPost(): void {
    // then link the featured image to the new post via ID
    this.newPost = new Post(this.description, this.featuredImage, this.hashtag);
    this.newPost.status = 'publish';
    // setup new post then post to API
    this.photofeedService.createPost(this.newPost)
        .subscribe(postData => {
          this.goBack();
        });
  }
  setImage($event): void {
    this.setThis($event.target);
  }
  setThis(inputValue: any): void {
    // get the file inputvalue
    const file: File = inputValue.files[0];
    // create a new instance of the FileReader
    const reader = new FileReader();
    // check to see if it had the right file extension
    if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif') {
      // set the file as a global variable
      this.imageAttachment = file;
      // set the filename to display it in the frontend
      this.fileName = this.imageAttachment.name;
      reader.onload = e => this.previewImg = reader.result;

      reader.readAsDataURL(file);

    } else {
      alert('this is not a supported image type');
    }
  }
  goBack(): void {
    this.location.back();
  }
}
