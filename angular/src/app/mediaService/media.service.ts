import { Featured } from './../Featured';
import { MessageService } from './../messageService/message.service';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
   })
};
@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private mediaUrl = `${environment.api.url}${environment.api.jsonurl}${environment.api.jsonendpoint}${environment.api.endPoints.media.url}`;
  private log(message: string) {
    this.messageService.add(`PostService: ${message}`);
  }
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getMediaById(id: string) {
    return this.http.get(`${this.mediaUrl}/${id}`, httpOptions)
  }
  createFeatured(attachment): Observable<Featured> {
    const httpHeader = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Disposition': 'attachment; filename="bitchass.jpg'
      })
    };

    return this.http.post<Featured>(`${this.mediaUrl}`, attachment, httpHeader)
          .pipe(
            tap(_ => this.log(`Featured image created`)),
            catchError(this.handleError('createFeatured'))
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
