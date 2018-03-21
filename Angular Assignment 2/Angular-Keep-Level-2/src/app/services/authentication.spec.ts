import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';


describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;
  const authInfo = {
    token: "123456"
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(AuthenticationService);
    httpMock = TestBed.get(HttpTestingController);
  });
  it('Authentication service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Authentication user data based on crendetials', () => {
    const data = {
      user: "admin",
      password: "password"
    }
    let token = service.authenticateUser(data).subscribe(token => {
      expect(token).toEqual(authInfo.token);
    });

    const postRequest = httpMock.expectOne({
      url: 'http://localhost:3000/auth/v1/',
      method: 'POST'
    });
    postRequest.flush(authInfo.token);
  });

  it('Bearer token to be saved and retrived from local storage', () => {
    const data = {
      user: "admin",
      password: "password"
    }
    service.authenticateUser(data).subscribe(token => {
      expect(token).toEqual(authInfo.token);
    });
    const postRequest = httpMock.expectOne({
      url: 'http://localhost:3000/auth/v1/',
      method: 'POST'
    });
    postRequest.flush(authInfo.token);
    service.setBearerToken(authInfo.token);
    let currentToken = service.getBearerToken();
    expect(currentToken).toEqual(authInfo.token);
  });
});
