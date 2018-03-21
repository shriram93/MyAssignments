import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { NoteComponent } from './note.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterService } from '../services/router.service';
import { Router, NavigationEnd } from '@angular/router';
import { Note } from '../note';


let MockRouterValue: any = {
  navigate: jasmine.createSpy('navigate')
};
class MockRouterClass {
  // Router
  public events = Observable.of(new NavigationEnd(0, 'http://localhost:4200/login', 'http://localhost:4200/login'));
  public url = "hi";
}
class MockRouterService {
  routeToEditNoteView(note: Note): Observable<Note> {
    return Observable.of(note);
  }
}

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;
  let service: RouterService;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [NoteComponent],
      providers: [{ provide: RouterService, useClass: MockRouterService }, { provide: Router, useValue: MockRouterValue, useClass: MockRouterClass }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
    let testNote = new Note;
    testNote.title = "test";
    testNote.text = "test";
    testNote.state = "Selected";
    component.note = testNote;
  });
  it('Note component should be created', () => {
    expect(component).toBeTruthy;
  });
  it('There should be mat-card element with mat-card-title and mat-card-content', () => {
    let de = fixture.debugElement.query(By.css('mat-card'));
    expect(de).toBeTruthy;
    de = fixture.debugElement.query(By.css('mat-card-title'));
    expect(de).toBeTruthy;
    de = fixture.debugElement.query(By.css('mat-card-content'));
    expect(de).toBeTruthy;
  });
  it('On click openEditNoteView should be called', async(() => {
    spyOn(component, 'openEditNoteView');
    let de = fixture.debugElement.nativeElement.querySelector('mat-card-title');
    expect(de).toBeTruthy;
    de.click();
    fixture.detectChanges();

    expect(component.openEditNoteView).toHaveBeenCalled();
  }));

});
