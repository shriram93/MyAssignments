import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { NoteTakerComponent } from './note-taker.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NotesService } from '../services/notes.service';
import { MatSnackBar } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Rx';
import { Note } from '../note';
import 'rxjs/add/observable/of';
import { By } from '@angular/platform-browser';

class MockServices {
  addNotes(note: Note): Observable<Note> {
    if (note.title === 'invalid' && note.text === 'invalid') {
      return Observable.throw({ message: 'your values are invalid' });
    }

    return Observable.of(note);
  }
}
let snackbar = { showToast: jasmine.createSpy('showToast') };
describe('NoteTakerComponent', () => {
  let component: NoteTakerComponent;
  let fixture: ComponentFixture<NoteTakerComponent>;
  let service: NotesService;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MatExpansionModule, MatInputModule, MatButtonModule, MatFormFieldModule, FormsModule, MatSelectModule, BrowserAnimationsModule],
      declarations: [NoteTakerComponent],
      providers: [{ provide: NotesService, useClass: MockServices }, { provide: MatSnackBar, useValue: snackbar }]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(NoteTakerComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(NotesService);
  });
  it('Note taker should be created', () => {
    expect(component).toBeTruthy;
  });
  it('Should have a input element for note title', () => {
    let de = fixture.debugElement.query(By.css('input'));
    expect(de).toBeTruthy;
    expect(de.nativeElement.value).toBe('');
  });
  it('Should have a textarea element for note description', () => {
    let de = fixture.debugElement.query(By.css('textarea'));
    expect(de).toBeTruthy;
    expect(de.nativeElement.value).toBe('');
  });
  it('Should have a select option for note category', () => {
    let de = fixture.debugElement.query(By.css('mat-option'));
    expect(de).toBeTruthy;
  });
  it('Should have a button with value done', () => {
    let de = fixture.debugElement.query(By.css('button'));
    expect(de).toBeTruthy;
    expect(de.nativeElement.textContent).toBe('Done');
  });

  it('Should not be able to take notes if title is blank', () => {
    const testNote = new Note;
    testNote.title = "";
    testNote.text = "test";
    testNote.state = "Started";
    component.note = testNote;
    let de = fixture.debugElement.query(By.css('button'));
    expect(de).toBeTruthy;
    de.nativeElement.click();
    fixture.detectChanges();
    expect(component.inputError).toBe(true);
  });
  it('Should not be able to take notes if text is blank', () => {
    const testNote = new Note;
    testNote.title = "test";
    testNote.text = "";
    testNote.state = "Started";
    component.note = testNote;
    let de = fixture.debugElement.query(By.css('button'));
    expect(de).toBeTruthy;
    de.nativeElement.click();
    fixture.detectChanges();
    expect(component.inputError).toBe(true);
  });
  it('Should not be able to take notes if category is blank', () => {
    const testNote = new Note;
    testNote.title = "test";
    testNote.text = "test";
    testNote.state = "";
    component.note = testNote;
    let de = fixture.debugElement.query(By.css('button'));
    expect(de).toBeTruthy;
    de.nativeElement.click();
    fixture.detectChanges();
    expect(component.inputError).toBe(true);
  });

});
