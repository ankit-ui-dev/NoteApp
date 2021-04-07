import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../auth/user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<any>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  // Using fuction for  signUp HTTP Request
  public onSubmitSignUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBeXIyrhIIE0Ui-Q7paaonHjh3ujXBIwds',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }

  //Check Whether User already  User login or  Not
  public checkLogin() {
    const localUserData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');

    if (!localUserData) {
      return;
    }
    const loadedUser = new User(
      localUserData.email,
      localUserData.id,
      localUserData._token,
      new Date(localUserData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      const expirationDate =
        new Date(localUserData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.user.next(loadedUser);
      this.checkLogout(expirationDate);
    }
  }

  // Logout  Function
  public onLogoutCall() {
    this.user.next(null);
    this.router.navigate(['/Home']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  // Check User  Logout status
  public checkLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.onLogoutCall();
    }, expirationDuration);
  }

  // Using fuction for  Login HTTP Request
  public onLogInForm(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBeXIyrhIIE0Ui-Q7paaonHjh3ujXBIwds',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }
  // useing for authentication  using tap operator
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.checkLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  // Using for Error Handling  By httpError Response
  public errorHandler(errorRes: HttpErrorResponse): string {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return errorMessage;
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return errorMessage;
  }
  // check Authen ticated
  public isAuthenticated() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData._token) {
      return true;
    }
    return false;
  }
}
