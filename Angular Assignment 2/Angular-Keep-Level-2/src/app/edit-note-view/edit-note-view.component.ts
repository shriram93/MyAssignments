import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import NoteStates from '../note';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit {

  note: Note;
  noteStates: string[];
  constructor(private dialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any, private notesService: NotesService, public snackBar: MatSnackBar) {
    this.noteStates = NoteStates;
  }
  ngOnInit() {
    this.note = new Note;
    this.note = this.notesService.getNoteById(this.data.noteId);
  }

  //Save the note changes in the server
  editNote() {
    this.notesService.editNote(this.note).subscribe(editNote => {
      this.dialogRef.close();
      this.snackBar.open("Note details updated!", "Dismiss", {
        duration: 2000,
      });
    })
  }

  //Delete the note from server
  deleteNote() {
    this.notesService.deleteNote(this.note).subscribe(deleteNote => {
      this.dialogRef.close();
      this.snackBar.open("Note deleted successfully", "Dismiss", {
        duration: 2000,
      });
    })
  }

}
