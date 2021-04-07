import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastsComponent } from 'src/app/shared/components/toasts/toasts.component';

@Component({
  selector: 'app-trash-list',
  templateUrl: './trash-list.component.html',
  styleUrls: ['./trash-list.component.scss'],
})
export class TrashListComponent implements OnInit {
  @ViewChild('toastComponent') public toastComponent?: ToastsComponent;
  @ViewChild('noteTrashbox') noteTrashbox?: ElementRef;

  notesTrash: any[] = [];
  public userId = '';
  public gridView = true;
  public message?: any;
  public deleteMessage = '';
  public deleteConfirm = false;
  public noteId = '';
  loader=false;
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('userData') || '').id;
    this.getTrashList();
  }
  // Get Trash List Here
  public getTrashList() {
    this.loader=true;
    const getTrashListUrl = `https://note-square-default-rtdb.firebaseio.com/${this.userId}/notes.json`;
    this.http.get<any>(getTrashListUrl).subscribe((res) => {
      const noteResult = res && Object.values(res);
      if (noteResult && noteResult.length) {
        this.notesTrash =
          noteResult.filter((x: any) => x.noteTrash === true) || [];
        console.log(this.notesTrash);
      } else {
        this.notesTrash = [];
      }
      this.loader=false;
    });
  }

  // Check Grid  notes view
  public onGridClick() {
    this.gridView = !this.gridView;
  }

  //  restore Note Here.
  public onRestoreNote(note: any) {
    this.noteId = note.noteId;
    const noteTrash = false;
    const noteWithOutTrash = {
      noteTrash,
    };
    this.http
      .patch(
        `https://note-square-default-rtdb.firebaseio.com/${this.userId}/notes/${this.noteId}.json`,
        noteWithOutTrash
      )
      .subscribe((response) => {
        this.message = {
          message: 'alert-success',
          messageType: 'Notes Updated SuccessFully !!',
        };
        this.toastComponent?.openToast();
        this.getTrashList();
        console.log('done');
      });
  }
  // Open Modal Box  for delete
  public onDeleteNote(note: any) {
    this.noteId = note.noteId;
    this.noteTrashbox?.nativeElement.classList.add('show', 'd-flex');
    this.deleteMessage = 'Do you want Delete  this note ??';
  }
  // Delete Notes
  public onDeleteConfirm() {
    this.deleteConfirm = true;
    if (this.deleteConfirm) {
      this.http
        .delete(
          `https://note-square-default-rtdb.firebaseio.com/${this.userId}/notes/${this.noteId}.json`
        )
        .subscribe(
          (response) => {
            this.message = {
              message: 'alert-success',
              messageType: 'Note Deleted !!',
            };
            this.toastComponent?.openToast();

            this.onModalBoxClose();
            this.deleteConfirm = false;
            this.getTrashList();
          },
          (errorRes) => {
            this.toastComponent?.openToast();
          }
        );
    }
  }
  // Close Modal Box  for delete
  public onModalBoxClose() {
    this.noteTrashbox?.nativeElement.classList.remove('show', 'd-flex');
    this.noteTrashbox?.nativeElement.classList.add('hide');
  }
}
