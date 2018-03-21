import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  bearerToken: any;
  submitMessage: boolean;
  errorMessage: string;

  constructor(private authService: AuthenticationService, private routerService: RouterService, public snackBar: MatSnackBar) {
    this.submitMessage = false;
    this.errorMessage = "Login ID or Password incorrect";
  }

  ngOnInit() {
  }

  //Submit the login details to server for authentication
  loginSubmit(formFields) {
    //If any field is empty display error message
    if (formFields.value.username == "" || formFields.value.password == "") {
      this.submitMessage = true;
      this.errorMessage = "Login ID or Password incorrect";
      return;
    }
    this.authService.authenticateUser(formFields.value).subscribe(
      res => {
        this.bearerToken = res['token'];
        this.authService.setBearerToken(this.bearerToken);
        this.routerService.routeToDashboard();
        this.snackBar.open(`Welcome back, ${formFields.value.username}`, "Dismiss", {
          duration: 2000,
        });
      },
      err => {
        //Display error message if userid or password is wrong
        this.submitMessage = true;
        const errorMessage: string = err.message;
        if (errorMessage.indexOf("403 Forbidden") > 0) {
          this.errorMessage = "Login ID or Password incorrect";
        }
        else {
          this.errorMessage = err.message;
        }
      }
    );
  }

}
