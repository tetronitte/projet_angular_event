import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Event} from "../models/event";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private apiUrl = 'http://localhost:3000/events';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl)
  }

  getEvent(id: number): Observable<Event> {
    return this.http.get<Event>(this.apiUrl+`/${id}`)
  }

  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event, this.httpOptions)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return throwError(error);
        })
      );
  }

  deleteEvent(id: number): Observable<Event> {
    return this.http.delete<Event>(this.apiUrl+`/${id}`, this.httpOptions);
  }

  editEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(this.apiUrl+`/${event.id}`,event, this.httpOptions);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}
