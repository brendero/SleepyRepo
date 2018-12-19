import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Sleeptrack } from '../Sleeptrack';
import { MessageService } from '../messageService/message.service';
import { tap, catchError } from 'rxjs/operators';

const httpHeader = {
  headers: new HttpHeaders ({
    'Content-type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
}
@Injectable({
  providedIn: 'root'
})
export class SleeptrackingService {
  private sleeptrackURl = `${environment.api.url}${environment.api.jsonurl}${environment.api.jsonendpoint}${environment.api.endPoints.sleeptracking.url}`;
  private log(message: string) {
    this.messageService.add(`PostService: ${message}`);
  }
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  createSleepTracking(data: Sleeptrack): Observable<Sleeptrack> {
    const httpBody = {
      'status': 'publish',
      'fields': {
        'sleep_date': data.sleep_date,
        'end_date': data.end_date,
        'sleep_hour': data.sleep_hour,
        'wake_hour': data.wake_hour
    }
    }

    return this.http.post<Sleeptrack>(`${this.sleeptrackURl}`, httpBody, httpHeader)
            .pipe(
              tap(newSleeptrack => this.log(`created new sleeptrack with id ${newSleeptrack}`)),
              catchError(this.handleError<Sleeptrack>(`createdSleeptrack`))
            );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
