import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isAuthenticated = false;
  constructor(private authService: AuthService) { }
  ngOnInit() {
    // Check User login or Not 
    this.authService.checkLogin();
    this.authService.user.subscribe(headerData => {
      if (headerData && headerData._token) {
        this.isAuthenticated = true;
      }
      else {
        this.isAuthenticated = false;
      }
    }
    );
  }
}
