import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from './note';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotesService {
  databaseUrl = 'http://localhost:3000/notes';
  constructor(private http: HttpClient) {
  }
  getNotes():Observable<Array<Note>> {
    return this.http.get<Array<Note>>(this.databaseUrl);
  }
  addNote(note: Note):Observable<Note> {
    return this.http.post<Note>(this.databaseUrl, note);
  }
  deleteNote(noteId: number):Observable<Note> {
    return this.http.delete<Note>(this.databaseUrl + '/' + noteId);
  }
}
