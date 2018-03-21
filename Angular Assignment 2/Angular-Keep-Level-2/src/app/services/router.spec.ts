import { TestBed, inject, async } from '@angular/core/testing';
import { RouterService } from './router.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";

let mockRouter: any = {
  navigate: ('navigate')
};


describe('RouterService', () => {
  let service: RouterService;
  let location: Location;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouterService, { provide: Router, useValue: mockRouter }],
      imports: [RouterTestingModule.withRoutes([])]
    });
    router = TestBed.get(Router);
    service = TestBed.get(RouterService);
  });

  it('Router service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('routeToLogin should change the route to /login', async(() => {
    spyOn(router, 'navigate');
    service.routeToLogin();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  }));

  it('routeToDashboard should change the route to /dashbaord', async(() => {
    spyOn(router, 'navigate');
    service.routeToDashboard();
    expect(router.navigate).toHaveBeenCalledWith(['dashboard']);
  }));

  it('changeView should change the route to notesview/listview', async(() => {
    spyOn(router, 'navigate');
    service.changeView("notesview");
    expect(router.navigate).toHaveBeenCalledWith(['dashboard', 'view', 'notesview']);
    service.changeView("listview");
    expect(router.navigate).toHaveBeenCalledWith(['dashboard', 'view', 'listview']);
  }));

});
