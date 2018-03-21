import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isNoteView: boolean;
  isLoginPage: boolean;
  constructor(private routerService: RouterService, private router: Router) {
    this.isNoteView = (this.routerService.getCurrentUrl().indexOf("notesview") > 0) ? true : false;
    router.events.subscribe(() => {
      this.isLoginPage = false;
      if (router.url.indexOf('login') > 0) {
        this.isLoginPage = true;
      }
    });
  }

  ngOnInit() {
  }

  //Change current view to List/Note view
  changeView(event) {
    this.isNoteView = (this.routerService.getCurrentUrl().indexOf("notesview") > 0) ? true : false;
    this.routerService.changeView(this.isNoteView == true?"listview":"notesview");
  }

}
