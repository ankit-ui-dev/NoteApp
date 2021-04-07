import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastsComponent } from 'src/app/shared/components/toasts/toasts.component';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @ViewChild('toastComponent') public toastComponent?: ToastsComponent;
  public error?: any;
  public isLoading = false;
  constructor(private authService: AuthService, private router: Router) {}

  // Login  Condition
  public onLogIn(form: NgForm) {
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;
    this.authService.onLogInForm(email, password).subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/notes']);
      },
      (errorRes) => {
        this.error = { message: 'alert alert-danger', messageType: errorRes };
        this.toastComponent?.openToast();
        this.isLoading = false;
      }
    );
  }
}
