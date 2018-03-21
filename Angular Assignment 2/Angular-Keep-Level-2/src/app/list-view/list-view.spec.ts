import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { ListViewComponent } from './list-view.component';
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



describe('ListViewComponent', () => {
  let component: ListViewComponent;
  let fixture: ComponentFixture<ListViewComponent>;
  let service: NotesService;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ListViewComponent],
      providers: [{ provide: NotesService, useClass: MockServices }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(NotesService);
  });
  it('List view should be created', () => {
    expect(component).toBeTruthy;
  });
  it('app-note should be present to display notes', () => {
    let de = fixture.debugElement.query(By.css('app-note'));
    expect(de).toBeTruthy;
  });
  it('It should have three categories Started,Not started and Completed', () => {
    let de = fixture.debugElement.query(By.css('.notStartedNotes'));
    expect(de).toBeTruthy;
    de = fixture.debugElement.query(By.css('.startedNotes'));
    expect(de).toBeTruthy;
    de = fixture.debugElement.query(By.css('.completedNotes'));
    expect(de).toBeTruthy;
  });
});
