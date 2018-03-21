import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Note } from '../note';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';

@Injectable()
export class NotesService {
  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;
  token: any;
  constructor(private http: HttpClient,
    private authserv: AuthenticationService) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject(this.notes);
    this.fetchNotesFromServer();
  }
  fetchNotesFromServer() {
    this.token = this.authserv.getBearerToken();
    return this.http.get<Array<Note>>('http://localhost:3000/api/v1/notes', {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.token}`)
    }).subscribe(notes => {
      this.notes = notes;
      this.notesSubject.next(this.notes);
    })
  }
  getNotes(): Observable<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>('http://localhost:3000/api/v1/notes', note, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.token}`)
    }).do(addedNote => {
      this.notes.push(addedNote);
      this.notesSubject.next(this.notes);
    }
      );
  }

  getNoteById(noteId): Note {
    const note = this.notes.find(note => note.id === noteId);
    return Object.assign({}, note);
  }

  editNote(note): Observable<Note> {
    return this.http.put<Note>(`http://localhost:3000/api/v1/notes/${note.id}`, note, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.token}`)
    }).do(editedNote => {
      const note = this.notes.find(note => note.id === editedNote.id);
      Object.assign(note, editedNote);
      this.notesSubject.next(this.notes);
    })
  }

  deleteNote(note) {
    const noteId = note.id;
    return this.http.delete<Array<Note>>(`http://localhost:3000/api/v1/notes/${noteId}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.token}`)
    }).do(res => {
      const note = this.getNoteById(noteId);
      this.notes.splice(this.notes.indexOf(note), 1);
      this.notesSubject.next(this.notes);
    }
      )
  }
}
