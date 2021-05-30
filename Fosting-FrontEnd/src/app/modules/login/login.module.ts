import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../aCommon/services/login.service';

const rountes: Routes =
  [
    {
      path: '',
      component: LoginComponent
    }
  ];


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(rountes)
  ],
  providers:[
    LoginService
  ]
})
export class LoginModule { }
