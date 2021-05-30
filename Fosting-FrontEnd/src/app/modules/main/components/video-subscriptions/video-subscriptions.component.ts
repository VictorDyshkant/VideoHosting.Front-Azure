import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserModel } from 'src/app/aCommon/models/user.model';
import { UserService } from 'src/app/aCommon/services/user.service';

@Component({
  selector: 'app-video-subscriptions',
  templateUrl: './video-subscriptions.component.html',
  styleUrls: ['./video-subscriptions.component.less']
})
export class VideoSubscriptionsComponent {

  $users: Observable<UserModel[]>;

  constructor(private userService: UserService, private toastr: ToastrService) { }

  find(name: string) {
    this.$users = this.userService.findUserByName(name).pipe(
      catchError((error: HttpErrorResponse) => {
        this.toastr.error(error.message ?? error.error);
        return throwError(error);
      })
    );
  }

}
