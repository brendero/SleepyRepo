import { MessageService } from './../messageService/message.service';
import { environment } from './../../environments/environment';
import { Post } from './../Post';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';

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
    return this.http.get<Post>(`${this.postUrl}`, httpOptions);
  }

  updateLikes(id: number, likeList): Observable<Post> {
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    const httpBody = {
      'fields': {
        'likes': likeList
      }
    };

    return this.http.post<Post>(`${environment.api.url}${environment.api.jsonurl}${environment.api.endPoints.acf.url}${environment.api.endPoints.photofeed.url}/${id}`, httpBody, httpHeader)
          .pipe(
            tap(_ => this.log(`userUpdated`)),
            catchError(this.handleError<Post>('updateUserPicture'))
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
