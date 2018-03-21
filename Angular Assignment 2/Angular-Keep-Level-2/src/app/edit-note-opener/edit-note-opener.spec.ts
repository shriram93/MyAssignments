import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { EditNoteOpenerComponent } from './edit-note-opener.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Rx';
import { Note } from '../note';
import { RouterService } from '../services/router.service';
import 'rxjs/add/observable/of';
import { By } from '@angular/platform-browser';
import { NoteComponent } from '../note/note.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

const activatedRouteSnapshotStub: any = {
  snapshot: {
    paramMap: {
      get: function() {

      }
    }
  }
};


class MockServicesClass {

}
describe('EditNoteOpenerComponent', () => {
  let component: EditNoteOpenerComponent;
  let fixture: ComponentFixture<EditNoteOpenerComponent>;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [EditNoteOpenerComponent],
      providers: [{ provide: RouterService, useClass: MockServicesClass }, { provide: MatDialog, useClass: MockServicesClass }, { provide: ActivatedRoute, useValue: activatedRouteSnapshotStub }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(EditNoteOpenerComponent);
    component = fixture.componentInstance;
  });
});
