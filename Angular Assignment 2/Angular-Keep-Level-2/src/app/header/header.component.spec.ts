import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RouterService } from '../services/router.service';
import { Router, NavigationEnd } from '@angular/router';
import { async, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import { By } from '@angular/platform-browser';

let mockRouter: any = {
  navigate: jasmine.createSpy('navigate')
};
class MockServices {
  // Router
  public events = Observable.of(new NavigationEnd(0, 'http://localhost:4200/login', 'http://localhost:4200/login'));
  public url = "hi";
}

describe('Header Component', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [MatToolbarModule, MatIconModule, AngularFontAwesomeModule],
      providers: [RouterService, { provide: Router, useValue: mockRouter, useClass: MockServices }]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('Header component should be created', async(inject([Router], (myService: Router) => {
    expect(component).toBeTruthy;
  })));
  it('Keep to be displayed in the toolbar', () => {
    let de = fixture.debugElement.query(By.css('mat-toolbar > h1'));
    expect(de).toBeTruthy;
    expect(de.nativeElement.textContent).toBe('Keep');
  });
});
