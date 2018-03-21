import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { EditNoteViewComponent } from './edit-note-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Rx';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import 'rxjs/add/observable/of';
import { By } from '@angular/platform-browser';
import { NoteComponent } from '../note/note.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

class MockServices {
  getNotes = Observable.of();
}

let snackbar = { showToast: jasmine.createSpy('showToast') };

describe('EditNoteViewComponent', () => {
  let component: EditNoteViewComponent;
  let fixture: ComponentFixture<EditNoteViewComponent>;
  let service: NotesService;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [EditNoteViewComponent],
      providers: [{ provide: NotesService, useClass: MockServices }, { provide: MAT_DIALOG_DATA, useValue: {} },
      { provide: MatDialogRef, useValue: {} }, { provide: MatSnackBar, useValue: snackbar }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(EditNoteViewComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(NotesService);
  });
  it('Edit note view should be created', () => {
    expect(component).toBeTruthy;
  });
  it('Should have input field to change note Title', () => {
    let de = fixture.debugElement.query(By.css('input[placeholder="Title"]'));
    expect(de).toBeTruthy;
    expect(de.nativeElement.value).toBe('');
  });
  it('Should have input field to change note Descrpition', () => {
    let de = fixture.debugElement.query(By.css('textarea[placeholder="Textarea"]'));
    expect(de).toBeTruthy;
    expect(de.nativeElement.value).toBe('');
  });
  it('Should have button to delete note', () => {
    let de = fixture.debugElement.query(By.css('button:nth-child(1)'));
    expect(de).toBeTruthy;
    expect(de.nativeElement.textContent).toBe('Delete');
  });
  it('Should have button to Save note changes', () => {
    let de = fixture.debugElement.query(By.css('button:nth-child(2)'));
    expect(de).toBeTruthy;
    expect(de.nativeElement.textContent).toBe('Save');
  });
});
