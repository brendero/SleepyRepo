import { environment } from './../../environments/environment';
import { Post } from './../Post';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
}
@Injectable({
  providedIn: 'root'
})
export class PhotofeedService {
  private postUrl = `${environment.api.url}${environment.api.jsonurl}${environment.api.jsonendpoint}${environment.api.endPoints.photofeed.url}`;
  constructor(
    private http: HttpClient
  ) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postUrl}?_embed`, httpOptions);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.postUrl}`, httpOptions);
  }

  checkLike(id: number, likeList): void {
  }
}
