import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MessageService } from './../messageService/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comment } from '../comment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
};
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentUrl = `${environment.api.url}${environment.api.jsonurl}${environment.api.jsonendpoint}${environment.api.endPoints.comments.url}`;
  private log(message: string) {
    this.messageService.add(`PostService: ${message}`);
  }
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getCommentsByPostId(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.commentUrl}?post=${id}&_embed`, httpOptions)
          .pipe(
            tap(comments => this.log('fetched comments')),
            catchError(this.handleError<Comment[]>('getCommentByPostId'))
          );
  }

  postComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.commentUrl}`, comment, httpOptions)
          .pipe(
            tap(_ => this.log(`Created comment`)),
            catchError(this.handleError<Comment>('created comment'))
          );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
