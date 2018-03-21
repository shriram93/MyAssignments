import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class RouterService {
  constructor(public router: Router) { }
  routeToDashboard() {
    this.router.navigate(['dashboard']);
  }
  routeToLogin() {
    this.router.navigate(['login']);
  }
  // dashboard/(noteEditOutlet:note/1/edit)
  routeToEditNoteView(noteId) {
    this.router.navigate(['dashboard', {
      outlets: {
        noteEditOutlet: ['note', noteId, 'edit']
      }
    }
    ])
  }

  changeView(changeToView) {
    this.router.navigate(['dashboard', 'view', changeToView])
  }

  routeBack() {
    //  this.location.back(); This method fails when we close and open edit view frequenctly
    const currentView = (this.getCurrentUrl().indexOf("notesview") > 0) ? "notesview" : "listview";
    this.router.navigateByUrl(`/dashboard/view/${currentView}`);
  }

  getCurrentUrl() {
    return window.location.href;
  }
}
