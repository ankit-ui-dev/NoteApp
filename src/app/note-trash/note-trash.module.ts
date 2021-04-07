import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteTrashRoutingModule } from './note-trash-routing.module';
import { TrashListComponent } from './components/trash-list/trash-list.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [TrashListComponent],
  imports: [
    CommonModule,SharedModule,
    NoteTrashRoutingModule
  ]
  
})
export class NoteTrashModule { }
