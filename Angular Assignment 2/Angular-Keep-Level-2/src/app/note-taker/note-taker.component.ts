import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import NoteStates from '../note';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {
  note: Note;
  inputError: boolean;
  errorMessage: string;
  noteStates: string[];
  constructor(private notesService: NotesService, public snackBar: MatSnackBar) {
    this.noteStates = NoteStates;
    this.errorMessage = "You must fill in all of the fields";
    this.inputError = false;
  }
  ngOnInit() {
    this.note = new Note;
  }
  takeNote() {
    this.inputError = false;
    if (this.note.text == "" || this.note.title == "" || this.note.state == "") {
      this.errorMessage = "You must fill in all the fields";
      this.inputError = true;
      return;
    }
    this.notesService.addNote(this.note).subscribe(
      data => {
        this.note = new Note();
        this.snackBar.open("Added note successfully", "Dismiss", {
          duration: 2000,
        });
      },
      err => {
        this.inputError = true;
        this.errorMessage = err.message;
      }
    )
  }

}
