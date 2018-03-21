import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { Note } from '../note';
import NoteStates from '../note';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  noteStates: string[];
  notStarted: Array<Note> = [];
  started: Array<Note> = [];
  completed: Array<Note> = [];
  constructor(private notesService: NotesService) {
    this.noteStates = NoteStates;
  }

  ngOnInit() {
    //Get all notes from the server and classify them based on their current category
    this.notesService
      .getNotes()
      .subscribe(data => {
        this.notStarted = [];
        this.started = [];
        this.completed = [];
        data.forEach(
          note => {
            if (note.state == "Not Started") {
              this.notStarted.push(note);
            }
            else if (note.state == "Started") {
              this.started.push(note);
            }
            else if (note.state == "Completed") {
              this.completed.push(note);
            }
          });
      }, err => { });
  }
}
