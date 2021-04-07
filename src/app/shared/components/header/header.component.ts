import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('collpase') collpase?: ElementRef;
  profileToggle = false;
  toggleValue = false;
  searchToggle?: boolean;
  isAuthenticated = false;
  selectValue = '';
  mySelect = [];
  userValue: any;
  public userEmail = '';
  public userName = '';
  public userFirstletter = '';
  public collapseOpen = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user.subscribe((headerData) => {
      if (headerData && headerData._token) {
        this.isAuthenticated = true;
        this.userValue = headerData;
        this.getUserDetails();
      } else {
        this.isAuthenticated = false;
      }
    });
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.collpase?.nativeElement.classList.remove('show');
        this.collpase?.nativeElement.classList.add('hide');
      }
    });
  }

  //  get User Details
  public getUserDetails() {
    if (this.userValue) {
      this.userEmail = this.userValue.email;
      this.userName = this.userEmail.substring(
        0,
        this.userEmail.lastIndexOf('@')
      );
      this.userFirstletter = this.userName.substr(0, 1);
    }
  }
  // Menu Open
  public openCollapse() {
    if (this.collapseOpen) {
      this.collpase?.nativeElement.classList.add('show');
      this.collapseOpen = false;
    } else {
      this.collpase?.nativeElement.classList.remove('show');
      this.collpase?.nativeElement.classList.add('hide');
      this.collapseOpen = true;
    }
  }

  onChange(event: any) {
    this.selectValue = event.value;
  }

  // SideBar  bar
  public sidebarToggle() {
    this.toggleValue = !this.toggleValue;
  }

  // Profile  Bar open
  public onAddProfileToggle() {
    this.profileToggle = !this.profileToggle;
  }
  // Profile  Bar Close
  public closeProfileToggle() {
    this.profileToggle = false;
  }
  public onSearchToggle() {
    this.searchToggle = !this.searchToggle;
  }
  //  user Session Expire
  public onlogout() {
    this.authService.onLogoutCall();
    this.toggleValue = false;
    this.closeProfileToggle();
  }
}
