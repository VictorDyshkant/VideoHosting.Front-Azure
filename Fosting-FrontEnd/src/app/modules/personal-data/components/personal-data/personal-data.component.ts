import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, concatMap, switchMap } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/aCommon/errorHandler';
import { UserModel } from 'src/app/aCommon/models/user.model';
import { UserService } from 'src/app/aCommon/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ersonal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.less']
})
export class PersonalDataComponent implements OnInit {

  user: UserModel = new UserModel();
  photo: File;

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userService.getUserInfo(localStorage.getItem(environment.id))
      .subscribe(ok => {
        this.user = <UserModel>ok;
        console.log(this.user);
      },
        (error: HttpErrorResponse) => {
          this.toastr.error(error.message);
        });
  }

  updateInfo() {
    this.userService.updateUserInfo(this.user)
      .pipe(concatMap(resp => {
        return this.userService.getUserInfo(localStorage.getItem(environment.id));
      }),
        catchError(ErrorHandler.handleErrorFromObservable)
      )
      .subscribe(ok => {
        this.user = <UserModel>ok;
        this.toastr.success('Information was updated.');
      },
        (error: HttpErrorResponse) => {
          this.toastr.error(error.message);
        });
  }

  loadPhoto(event) {
    let photo = event.target.files[0];
    if (photo.type.match('png') || photo.type.match('jpeg')) {
      this.toastr.success('Photo was uploaded.');
      this.photo = photo;
    }
    else {
      this.toastr.error('Photo should be in png or jpeg format!!!');
    }
  }

  updatePhoto() {
    console.log(this.photo);
    this.userService.updateUserPhoto(this.photo)
      .pipe(concatMap(resp => {
        return this.userService.getUserInfo(localStorage.getItem(environment.id));
      }),
        catchError(ErrorHandler.handleErrorFromObservable)
      ).subscribe(ok => {
        this.user = <UserModel>ok;
      },
        (error: HttpErrorResponse) => {
          this.toastr.error(error.message);
        });
  }
}
