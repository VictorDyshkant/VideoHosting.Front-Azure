import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, switchMap } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/aCommon/errorHandler';
import { UserService } from 'src/app/aCommon/services/user.service';
import { environment } from 'src/environments/environment';
import { UserModel } from '../../../../aCommon/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  admin: boolean = false;
  id: string = '';
  subText:string = 'Subscribe';
  user: UserModel = new UserModel();

  constructor(private activateRoute: ActivatedRoute, private nav: Router, private userService: UserService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.id = localStorage.getItem(environment.id);
    this.activateRoute.paramMap.pipe(
      switchMap(params => {
        let id = params.get('id');
        return this.userService.getUserInfo(id);
      }),
      catchError(ErrorHandler.handleErrorFromObservable)
    )
      .subscribe(ok => {
        this.user = <UserModel>ok;
        this.subText = this.user.doSubscribed ? "Unsbscribe" : "Subscribe";
      },
        (error: HttpErrorResponse) => {
          this.toastr.error(error.message);
        });
  }

  change() {
    this.nav.navigate(['/updateuser', this.id]);
  }

  subscribe() {
    this.userService.subscribe(this.user.id).subscribe(
      (resp) => {
        console.log(resp);
        this.user.doSubscribed = <boolean>resp;
        this.subText = this.user.doSubscribed ? "Unsbscribe" : "Subscribe";
        if(this.user.doSubscribed){
          this.user.subscribers++;
        }
        else{
          this.user.subscribers--;
        }
      },
      (error) => { console.log(error) }
    );
  }

}
