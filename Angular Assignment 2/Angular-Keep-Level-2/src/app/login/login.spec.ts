import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterService } from '../services/router.service';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Note } from '../note';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

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

let snackbar = { showToast: jasmine.createSpy('showToast') };
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: RouterService;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [LoginComponent],
      providers: [{ provide: AuthenticationService, useClass: MockRouterService }, { provide: RouterService, useClass: MockRouterService }, { provide: Router, useValue: MockRouterValue, useClass: MockRouterClass }, { provide: MatSnackBar, useValue: snackbar }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });
  it('Login component should be created', () => {
    expect(component).toBeTruthy;
  });
  it('Should have input field to enter username', () => {
    let de = fixture.debugElement.query(By.css('input[name="username"]'));
    expect(de).toBeTruthy;
    expect(de.nativeElement.value).toBe('');
  });
  it('Should have input field to enter password', () => {
    let de = fixture.debugElement.query(By.css('input[name="password"]'));
    expect(de).toBeTruthy;
    expect(de.nativeElement.value).toBe('');
  });
  it('Should have button to login', () => {
    let de = fixture.debugElement.query(By.css('button'));
    expect(de).toBeTruthy;
    expect(de.nativeElement.textContent).toBe('Login');
  });
  it('Should call loginSubmit fuction on clicking Login button', async(() => {
    spyOn(component, 'loginSubmit');
    let de = fixture.debugElement.query(By.css('button'));
    expect(de).toBeTruthy;
    de.nativeElement.click();
    expect(component.loginSubmit).toHaveBeenCalled();
  }));
});
