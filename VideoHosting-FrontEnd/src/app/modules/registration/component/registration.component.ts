import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, retry, share } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/aCommon/errorHandler';
import { RegistrationModel } from '../models/Registration.model';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})
export class RegistrationComponent implements OnInit {

  private userExistMessage = "User for such email has been registrated.";
  registrationModel: RegistrationModel;

  constructor(private registrarionService: RegistrationService, private toastr: ToastrService, private navigator: Router) {
  }

  ngOnInit(): void {
    this.registrationModel = new RegistrationModel();
  }

  registrate(): void {
    this.registrarionService.doExist(this.registrationModel.Email)
      .pipe(
        concatMap(result => {
          if (result == false) {
            return this.registrarionService.registrate(this.registrationModel);
          }

          return of(new HttpErrorResponse({ error: this.userExistMessage }));
        }),
        catchError(ErrorHandler.handleErrorFromObservable)
      )
      .subscribe(ok => {
        this.navigator.navigate(['/login']);
      },
        (error: HttpErrorResponse) => {
          this.toastr.error(error.message);
        });
  }

}
