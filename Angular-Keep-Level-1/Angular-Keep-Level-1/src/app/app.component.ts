import { Component, OnInit } from '@angular/core';
import { Note } from './note';
import { NotesService } from './notes.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private notesService: NotesService) {
  }
  note: Note = new Note;

  noteArray: Array<Note> = [];

  formValid = true;

  errMessage: String = '';
  currentText: String;
  currentTitle: String;
  showDeleteBtn: Array<boolean>;

  ngOnInit() {
    this.notesService.getNotes().subscribe(
      data => this.noteArray = data,
      err => console.log(err)
    );
    this.currentText = '';
    this.currentTitle = '';
    this.formValid = true;
    this.showDeleteBtn = [];
  }
  addNote() {
    this.note.title = this.currentTitle;
    this.note.text = this.currentText;
    this.formValid = (this.note.title.length > 0) && (this.note.text.length > 0);
    if (this.formValid) {
      let maxId = 1;
      if (this.noteArray.length > 0) {
        this.noteArray.forEach((tmpnote) => {
          maxId = maxId < tmpnote.id ? tmpnote.id : maxId;
        });
        this.note.id = maxId + 1;
      }
      else {
        this.note.id = maxId;
      }
      console.log(this.note);
      this.noteArray.push(this.note);
      console.log(this.noteArray);
      this.errMessage = "";
      this.notesService.addNote(this.note).subscribe(
        data => {
          this.currentText = '';
          this.currentTitle = '';
          this.showDeleteBtn[maxId - 1] = false;
          this.note = new Note;
        },
        err => {
          this.noteArray.splice(this.noteArray.indexOf(this.note), 1);
          this.errMessage = err.message;
          this.note = new Note;
        }
      );
    }
  }
  deleteNote(event, note) {
    const cardId: number = event.target.parentNode.parentNode.querySelector("#NoteId").innerHTML;
    this.notesService.deleteNote(cardId).subscribe(
      data => {
        console.log("Going to delete data" + cardId);;
        const index = this.noteArray.indexOf(note);
        console.log("index " + index);
        this.noteArray.splice(index, 1);
        this.showDeleteBtn[index] = false;
        console.log("Currnet note array is" + this.noteArray);
      },
      err => {
        console.log(err);
      }
    );
  }
}
