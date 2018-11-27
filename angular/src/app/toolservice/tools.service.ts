import { Tool } from './../Tool';
import { Observable } from 'rxjs';
import { MessageService } from './../messageService/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
   })
};
@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  private toolsUrl = `${environment.api.url}${environment.api.jsonurl}${environment.api.jsonendpoint}${environment.api.endPoints.tools.url}`;
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }
  getTools(): Observable<Tool[]> {
    return this.http.get<Tool[]>(`${this.toolsUrl}?_embed`, httpOptions);
  }
}
