import { environment } from 'src/environments/environment';
import { AuthToken } from './../authToken';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../User';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from '../messageService/message.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
   })
};

const httpHeader = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private tokenUrl = `${environment.api.url}${environment.api.jsonurl}`;
  private log(message: string) {
    this.messageService.add(`PostService: ${message}`);
  }
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  userLogin(username: string, password: string): Observable<AuthToken> {
    const httpBody = new HttpParams()
                    .set('username', username)
                    .set('password', password);

    return this.http.post<AuthToken>(`${this.tokenUrl}${environment.api.endPoints.auth.url}`, httpBody, httpOptions)
                .pipe(
                  tap(token => this.log('fetched Tokens'))
                );
  }

  userLogout(): void {
    localStorage.clear();
    // TODO: revoke token
    // return this.http.post
  }

  getAllUsers(): Observable<User[]> {

    return this.http.get<User[]>(`${this.tokenUrl}${environment.api.jsonendpoint}${environment.api.endPoints.Users.url}`, httpHeader);
  }

  createUser(user: User): Observable<User> {
    const httpData = new HttpParams()
                    .set('username', user.username)
                    .set('firstname', user.firstname)
                    .set('lastname', user.lastname)
                    .set('email', user.email)
                    .set('password', user.password)
                    .set('avatar', user.meta.avatar);

    return this.http.post<User>(`${this.tokenUrl}${environment.api.jsonendpoint}${environment.api.endPoints.Users.url}/register`, httpData, httpOptions)
          .pipe(
            tap(newUser => this.log(`Created user ${newUser}`))
          );
  }

  getActiveUser(): Observable<User> {

    return this.http.get<User>(`${this.tokenUrl}${environment.api.jsonendpoint}${environment.api.endPoints.Users.url}/me`, httpHeader)
          .pipe(
            tap(_ => this.log(`gotUser`)),
            catchError(this.handleError<User>('getActiveUser'))
          );
  }

  getUserById(id: number): Observable<User> {

    return this.http.get<User>(`${this.tokenUrl}${environment.api.jsonendpoint}${environment.api.endPoints.Users.url}/${id}`, httpHeader)
          .pipe(
            tap(_ => this.log(`gotUser with Id: ${id}`)),
            catchError(this.handleError<User>('getUserWithId'))
          );
  }

  updateUserPicture(id: number, avatar): Observable<User> {

    const httpBody = {
      'meta': {
        'avatar': `${avatar}`
      }
    };

    return this.http.post<User>(`${this.tokenUrl}${environment.api.jsonendpoint}${environment.api.endPoints.Users.url}/${id}`, httpBody, httpHeader)
          .pipe(
            tap(_ => this.log(`userUpdated`)),
            catchError(this.handleError<User>('updateUserPicture'))
          );
  }
  updateSlaapdoel(id: number, slaapdoel: number): Observable<User> {

    const httpBody = {
      'meta': {
        'slaapdoel': slaapdoel
      }
    };

    return this.http.post<User>(`${this.tokenUrl}${environment.api.jsonendpoint}${environment.api.endPoints.Users.url}/${id}`, httpBody, httpHeader)
          .pipe(
            tap(_ => this.log(`Metaupdated`)),
            catchError(this.handleError<User>(`updateSlaapdoel`))
          );
  }

  updateLocation(id: number, lat: number, long: number): Observable<User> {

    const httpBody = {
      'fields': {
        'location': {
          'adress': '',
          'lat': lat,
          'lng': long
        }
      }
    };
    return this.http.post<User>(`${this.tokenUrl}${environment.api.endPoints.acf.url}${environment.api.endPoints.Users.url}/${id}`, httpBody, httpHeader)
          .pipe(
            tap(_ => this.log(`location updated`)),
            catchError(this.handleError<User>(`updateLocation`))
          );
  }

  updateFriends(id: number, friendList: any): Observable<User> {

    const httpBody = {
      'fields': {
        'friends': friendList
      }
    };
    return this.http.post<User>(`${this.tokenUrl}${environment.api.endPoints.acf.url}${environment.api.endPoints.Users.url}/${id}`, httpBody, httpHeader)
  }

   /* GET Users whose name contains search term */
   searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<User[]>(`${this.tokenUrl}${environment.api.jsonendpoint}${environment.api.endPoints.Users.url}/?search=${term}&per_page=10`).pipe(
      tap(_ => this.log(`found Users matching "${term}"`)),
      catchError(this.handleError<User[]>('searchUsers', []))
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
