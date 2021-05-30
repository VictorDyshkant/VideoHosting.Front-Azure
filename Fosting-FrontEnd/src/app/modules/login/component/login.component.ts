import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/aCommon/errorHandler';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login.model';
import { LoginService } from '../../../aCommon/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loginModel: LoginModel;
  constructor(private loginService: LoginService, private navigator: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginModel = new LoginModel();
  }

  login(): void {
    this.loginService.authenticate(this.loginModel)
      .pipe(catchError(ErrorHandler.handleErrorFromObservable))
      .subscribe((ok) => {
        localStorage.setItem(environment.token, ok['access_token'])
        localStorage.setItem(environment.id, ok['id'])
        this.navigator.navigate(['/main']);
      },
        (error: HttpErrorResponse) => {
          if (error.error != null && error.error != '') {
            this.toastr.error(error.error);
          } else {
            this.toastr.error(error.message);
          }
        });
  }
}
