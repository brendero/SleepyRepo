import { Observable } from 'rxjs';
import { MessageService } from './../messageService/message.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { User } from '../User';

const httpHeader = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private tokenUrl = `${environment.api.url}${environment.api.jsonurl}`;
  private log(message: string) {
    this.messageService.add(`PostService: ${message}`);
  }
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }


  updateQuiz(id: number, sleepNumber: number): Observable<User> {
    const httpBody = {
      'fields': {
        'sleeptype': sleepNumber
      }
    };
    return this.http.post<User>(`${this.tokenUrl}${environment.api.endPoints.acf.url}${environment.api.endPoints.Users.url}/${id}`, httpBody, httpHeader)
        .pipe(
          tap(_ => this.log(`sleeptype updated`))
        );
  }
  returnTypeQuiz(total: number) {
    switch (true) {
      case (total < 14):
        return 'Sleepyhead';
      case (total < 18):
        return 'Panda';
      case (total < 22):
        return 'Restless bat';
      case (total < 26):
        return 'Sleep lover';
      case (total < 30):
        return 'morning person';
      case (total == 30):
        return 'king/queen of sleep';
    }
  }
}
