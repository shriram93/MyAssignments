import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../note';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  @Input() note: Note;
  constructor(private routerService: RouterService) { }

  //Open note edit compoenent when user click on any note
  openEditNoteView() {
    this.routerService.routeToEditNoteView(this.note.id);
  }
}
