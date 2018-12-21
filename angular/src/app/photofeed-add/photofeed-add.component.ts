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
  constructor(
    private fileReaderService: FileReaderService,
    private mediaService: MediaService,
    private photofeedService: PhotofeedService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  postSubmit(): void {
    // first make a featured image using the picture value
    const formData = new FormData();
    formData.append('file', this.imageAttachment);
    this.mediaService.createFeatured(formData)
        .subscribe(imgData => {
          console.log(imgData);
          this.featuredImage = imgData.id;
          this.makeNewPost();
        });
    }
    makeNewPost(): void {
    // then link the featured image to the new post via ID
    this.newPost = new Post();
    this.newPost.content = this.description;
    this.newPost.featured_media = this.featuredImage;
    this.newPost.status = 'publish';
    // setup new post then post to API
    this.photofeedService.createPost(this.newPost)
        .subscribe(postData => {
          console.log(postData);
          this.goBack();
        });
  }
  setImage($event): void {
    console.log($event);
    this.setThis($event.target);
  }
  setThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const reader = new FileReader();

    if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif') {
      this.imageAttachment = file;
      this.fileName = this.imageAttachment.name;
      console.log(this.imageAttachment);
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
