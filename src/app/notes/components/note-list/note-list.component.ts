import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastsComponent } from 'src/app/shared/components/toasts/toasts.component';

import { v4 as uuidv4 } from 'uuid';
import { AuthService } from 'src/app/auth/auth.service';
import { FIRE_BASE_API } from '../../constant/note.constant';
uuidv4();
@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit {
  @ViewChild('addToggle') addToggle?: ElementRef;
  @ViewChild('column23') column23?: ElementRef;
  @ViewChild('toastComponent') public toastComponent?: ToastsComponent;

  public gridView = true;
  public list = 'string list';
  public tagsList = ['Notes', 'Work', 'Personal', 'Others'];
  public colorList = [
    { key: 'Default', value: '#ffffff00' },
    { key: 'Red', value: '#5c2b29' },
    { key: 'Orange', value: '#584317' },
    { key: 'Yellow', value: '#635d19' },
    { key: 'Green', value: '#345920' },
    { key: 'Blue', value: '#1e3a5f' },
    { key: 'Purple', value: '#42275e' },
    { key: 'Pink', value: '#5b2245' },
    { key: 'Grey', value: '#3c3f43' },
  ];
  public message?: any;
  public editNote = false;
  notes?: any[] = [];
  userId = '';
  public editNoteId = '';
  public searchkeyword = '';
  public searchcolor = '';
  public searchtags = '';
  loader=false;

  notesFrom = new FormGroup({});
  filterForm = new FormGroup({});

  constructor(
    private http: HttpClient,
    private el: ElementRef,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('userData') || '').id;
    this.notesFrom = new FormGroup({
      noteTitleName: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(35)]),
      noteTag: new FormControl(null),
      noteText: new FormControl(null, Validators.required),
      noteColor: new FormControl(),
    });
    console.log(this.notesFrom.value)
    this.getNoteList();
    this.onFilterForm();
  }
  // Get Note List here
  public getNoteList() {
    this.loader=true;
    const getNoteListURL = `https://note-square-default-rtdb.firebaseio.com/${this.userId}/notes.json`;
    this.http.get<any>(getNoteListURL).subscribe((res) => {
      const noteResult = res && Object.values(res);
      
      if (noteResult && noteResult.length) {
        const noteLatest = noteResult.reverse();
        this.notes =
          noteLatest.filter((x: any) => {
            if (x.noteTrash) {
              return x.noteTrash === false;
            }
            return x;
          }) || [];
      }
      this.loader=false;
    });
  }

  //Note Submit and store in db
  public onSubmit() {
    const noteId = uuidv4();
    const addFrom = this.notesFrom.value;
    const noteUpdatedTime = new Date().toISOString();
    const noteWithNoteId = {
      ...addFrom,
      noteId,
      noteUpdatedTime,
    };
    const noteWithEdit = {
      ...addFrom,
      noteId: this.editNoteId,
      noteUpdatedTime,
    };
    const noteSubmitUrl = `${FIRE_BASE_API}/${this.userId}/notes/${noteId}.json`;
    if (this.editNote === true) {
      this.http
        .patch(
          `${FIRE_BASE_API}/${this.userId}/notes/${this.editNoteId}.json`,
          noteWithEdit
        )
        .subscribe((response) => {
          this.message = {
            message: 'alert-success',
            messageType: 'Notes Updated SuccessFully !!',
          };
          this.editNote = false;
          this.onCloseAddToogle();
          this.getNoteList();
          this.toastComponent?.openToast();
        });
    } else {
      this.http.put(noteSubmitUrl, noteWithNoteId).subscribe((response) => {
        this.message = {
          message: 'alert-success',
          messageType: 'Notes Add SuccessFully !!',
        };
        this.onCloseAddToogle();
        this.getNoteList();
        this.toastComponent?.openToast();
      });
    }
    this.notesFrom.reset();
  }

  // Change Note Grid View
  public onGridClick() {
    this.gridView = !this.gridView;
  }

  // Add Model box.
  public onAddModelNotes() {
    this.addToggle?.nativeElement.classList.add('show', 'd-flex');
  }
  // Close Model box.
  public onCloseAddToogle() {
    this.addToggle?.nativeElement.classList.remove('show', 'd-flex');
    this.addToggle?.nativeElement.classList.add('hide');
  }
  //  Move to note Trash
  public onMoveTrash(note: any) {
    const noteId = note.noteId;
    const noteTrash = true;
    const noteWithNoteTrash = {
      noteTrash,
    };
    const trashUrl = `${FIRE_BASE_API}/${this.userId}/notes/${noteId}.json`;
    this.http.patch(trashUrl, noteWithNoteTrash).subscribe((response) => {
      this.message = {
        message: 'alert-success',
        messageType: 'Move to Note-Trash !!',
      };
      this.getNoteList();
      this.toastComponent?.openToast();
    });
  }
  // Edit Mode note true Condition
  public onEdit(note: any) {
    this.editNoteId = note.noteId;
    console.log(this.editNoteId);
    this.editNote = true;
    this.addToggle?.nativeElement.classList.add('show', 'd-flex');
    this.notesFrom.setValue({
      noteTitleName: note.noteTitleName,
      noteTag: note.noteTag,
      noteText: note.noteText,
      noteColor: note.noteColor,
    });
  }
  // Search Filter  form Value
  onFilterForm() {
    this.filterForm = new FormGroup({
      searchKeyword: new FormControl(null),
      searchColor: new FormControl(null),
      searchTags: new FormControl(null),
    });
    this.filterForm.valueChanges.subscribe((value) => {
      this.searchkeyword = value.searchKeyword;
      this.searchcolor = value.searchColor;
      this.searchtags = value.searchTags;
    });
  }
  // Search Form Clear
  onFormClear() {
    this.filterForm.reset();
  }
}
