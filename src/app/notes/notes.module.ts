import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesRoutingModule } from './notes-routing.module';
import { NoteListComponent } from './components/note-list/note-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [NoteListComponent],
  imports: [
    CommonModule,
    NotesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class NotesModule { }
