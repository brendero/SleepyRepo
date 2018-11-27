import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  constructor(
    private http: HttpClient
  ) { }

  getMediaById(id: string) {
    return this.http.get(`${this.mediaUrl}/${id}`, httpOptions)
  }
}
