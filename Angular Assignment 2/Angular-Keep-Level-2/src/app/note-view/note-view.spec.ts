import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { NoteViewComponent } from './note-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Rx';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import 'rxjs/add/observable/of';
import { By } from '@angular/platform-browser';
import { NoteComponent } from '../note/note.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

class MockServices {
  getNotes = Observable.of();
}



describe('NoteTakerComponent', () => {
  let component: NoteViewComponent;
  let fixture: ComponentFixture<NoteViewComponent>;
  let service: NotesService;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [NoteViewComponent],
      providers: [{ provide: NotesService, useClass: MockServices }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(NoteViewComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(NotesService);
  });
  it('Note view should be created', () => {
    expect(component).toBeTruthy;
  });
  it('app-note should be present to display notes', () => {
    let de = fixture.debugElement.query(By.css('app-note'));
    expect(de).toBeTruthy;
  });

});
