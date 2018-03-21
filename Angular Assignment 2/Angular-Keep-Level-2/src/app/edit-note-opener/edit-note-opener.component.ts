import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private routerService: RouterService) {
    // Get note id from the route url
    const noteId = +this.activatedRoute.snapshot.paramMap.get('noteId');
    // Open Edit note component and pass the note id
    this.dialog.open(EditNoteViewComponent, {
      data: {
        noteId: noteId
      }
      // After closing the Edit note component go back to the parent url
    }).afterClosed().subscribe(result => {
      this.routerService.routeBack();
    });
  }
  ngOnInit() {
  }
}
