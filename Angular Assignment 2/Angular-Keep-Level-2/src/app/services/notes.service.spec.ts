import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { NotesService } from './notes.service';

class MockService {
  public getBearerToken = function() { };
}


describe('NotesService', () => {
  let service: NotesService;
  let httpMock: HttpTestingController;
  const testNote = {
    id: 0,
    title: 'note1_tite',
    text: 'note1_text',
    state: 'note1_state'
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotesService, { provide: AuthenticationService, useClass: MockService }],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(NotesService);
    httpMock = TestBed.get(HttpTestingController);
    const request = httpMock.expectOne({
      url: 'http://localhost:3000/api/v1/notes',
      method: 'GET'
    });
    request.flush([testNote]);
  });
  it('Notes service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fetchNotesFromServer should be making right api calls and update notesSubject', () => {
    service.fetchNotesFromServer();
    const request = httpMock.expectOne({
      url: 'http://localhost:3000/api/v1/notes',
      method: 'GET'
    });
    request.flush([testNote]);
    service.getNotes().subscribe(notes => {
      expect(notes).toEqual([testNote]);
    });
  });

  it('addNotes should be calling the right api with the right paramaters and updating notesSubject', () => {
    const testNote2 = {
      id: 1,
      title: 'note2_tite',
      text: 'note2_text',
      state: 'note2_state'
    };
    service.addNote(testNote2).subscribe(note => {
      expect(note).toEqual(testNote2);
    }
    );
    const postRequest = httpMock.expectOne({
      url: 'http://localhost:3000/api/v1/notes',
      method: 'POST'
    });
    postRequest.flush(testNote2);
    expect(postRequest.request.body).toEqual(testNote2);

    service.getNotes().subscribe(notes => {
      expect(notes).toEqual([testNote, testNote2]);
    });
  });
  it('edit note should be calling right api calls and updating notesSubject', () => {
    //Add note in the noteSubject
    const testNote2 = {
      id: 1,
      title: 'note2_tite',
      text: 'note2_text',
      state: 'note2_state'
    };
    service.addNote(testNote2).subscribe(note => {
      expect(note).toEqual(testNote2);
    }
    );
    const postRequest = httpMock.expectOne({
      url: 'http://localhost:3000/api/v1/notes',
      method: 'POST'
    });
    postRequest.flush(testNote2);
    expect(postRequest.request.body).toEqual(testNote2);

    //Edit note in the noteSubject
    const newTestNote2 = {
      id: 1,
      title: 'note2_new_tite',
      text: 'note2_new_text',
      state: 'note2_new_state'
    };
    service.editNote(newTestNote2).subscribe(note => {
      expect(note).toEqual(newTestNote2);
    });
    const putRequest = httpMock.expectOne({
      url: `http://localhost:3000/api/v1/notes/${newTestNote2.id}`,
      method: 'PUT'
    });
    putRequest.flush(newTestNote2);
    service.getNotes().subscribe(notes => {
      expect(notes).toEqual([testNote, newTestNote2]);
    }
    );
  });

  it('getNotesById should be passing the matching object', () => {
    let Note = service.getNoteById(testNote.id);
    expect(Note).toEqual(testNote);
  });
});
