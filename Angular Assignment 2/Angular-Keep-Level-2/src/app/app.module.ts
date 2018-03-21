import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { InputTrimModule } from 'ng2-trim-directive';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { LoginComponent } from './login/login.component';
import { NoteComponent } from './note/note.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';

import { NotesService } from './services/notes.service';
import { AuthenticationService } from './services/authentication.service';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { RouterService } from './services/router.service';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CanActivateRouteGuard],
    children: [
      {
        path: 'view/notesview', component: NoteViewComponent
      },
      {
        path: '', redirectTo: 'view/notesview', pathMatch: 'full'
      },
      {
        path: 'view/listview', component: ListViewComponent
      },
      {
        path: 'note/:noteId/edit', component: EditNoteOpenerComponent,
        outlet: 'noteEditOutlet'
      }
    ]
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
]



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    NoteTakerComponent,
    NoteViewComponent,
    ListViewComponent,
    LoginComponent,
    NoteComponent,
    EditNoteViewComponent,
    EditNoteOpenerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule,
    AngularFontAwesomeModule,
    MatGridListModule,
    MatTooltipModule,
    MatSelectModule,
    FormsModule,
    InputTrimModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    NotesService,
    AuthenticationService,
    RouterService,
    CanActivateRouteGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [EditNoteViewComponent]
})
export class AppModule { }
