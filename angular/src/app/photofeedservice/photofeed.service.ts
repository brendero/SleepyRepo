import { MessageService } from './../messageService/message.service';
import { environment } from './../../environments/environment';
import { Post } from './../Post';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
}
@Injectable({
  providedIn: 'root'
})
export class PhotofeedService {
  private postUrl = `${environment.api.url}${environment.api.jsonurl}${environment.api.jsonendpoint}${environment.api.endPoints.photofeed.url}`;
  private log(message: string) {
    this.messageService.add(`PostService: ${message}`);
  }
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postUrl}?_embed`, httpOptions);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.postUrl}/${id}?_embed`, httpOptions);
  }
  filterPostByAuthor(id: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postUrl}?author=${id}&filter[orderby]=date&order=asc&_embed`, httpOptions);
  }
  updateLikes(id: number, likeList): Observable<Post> {
    const httpBody = {
      'fields': {
        'likes': likeList
      }
    };

    return this.http.post<Post>(`${environment.api.url}${environment.api.jsonurl}${environment.api.endPoints.acf.url}${environment.api.endPoints.photofeed.url}/${id}`, httpBody, httpOptions)
          .pipe(
            tap(_ => this.log(`userUpdated`)),
            catchError(this.handleError<Post>('updateUserPicture'))
          );
  }

  createPost(data: Post): Observable<Post> {
    return this.http.post<Post>(`${this.postUrl}`, data, httpOptions)
          .pipe(
            tap(_ => this.log(`postCreated`)),
            catchError(this.handleError<Post>('createPost'))
          );
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`${this.postUrl}/${id}`, httpOptions)
          .pipe(
            tap(_ => this.log(`PostDeleted`)),
          );
  }

  getHashTags(): Observable<any> {
    return this.http.get<any>(`${environment.api.url}${environment.api.jsonurl}${environment.api.jsonendpoint}${environment.api.endPoints.categories.url}`, httpOptions)
          .pipe(
            tap(_ => this.log(`categories`))
          );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
