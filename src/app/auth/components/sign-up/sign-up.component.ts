import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastsComponent } from 'src/app/shared/components/toasts/toasts.component';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  @ViewChild('toastComponent', { static: false })
  public toastComponent?: ToastsComponent;
  public isLoading = false;
  public error?: any;

  constructor(private authSerive: AuthService, private router: Router) {}
  // SignUp Condition
  public onSignUp(form: NgForm) {
    this.isLoading = true;
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.authSerive.onSubmitSignUp(email, password).subscribe(
      (resData) => {
        this.isLoading = false;
        this.error = {
          message: 'alert alert-success',
          messageType: 'Register Sucessfully. Taking to login page!!',
        };
        this.toastComponent?.openToast();
        setTimeout(() => {
          this.router.navigate(['auth/login']);
        }, 2000);
      },
      (errorRes) => {
        const errorDetails = this.authSerive.errorHandler(errorRes);
        this.error = {
          message: 'alert alert-danger',
          messageType: errorDetails,
        };
        this.toastComponent?.openToast();
        this.isLoading = false;
      }
    );
  }
}
