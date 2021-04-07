import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
})
export class ToastsComponent implements OnInit {
  @Input() toastMessage = { message: '', messageType: '' };
  public showToast = false;
  constructor() {}
  ngOnInit(): void {}
  public openToast() {
    this.showToast = true;
    setTimeout(() => {
      this.closeToast();
    }, 5000);
  }
  public closeToast() {
    this.showToast = false;
  }
}
