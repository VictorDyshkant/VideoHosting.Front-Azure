import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './component/registration.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegistrationService } from './services/registration.service';

const rountes: Routes =
  [
    {
      path: '',
      component: RegistrationComponent
    }
  ];

@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule, 
    FormsModule,
    RouterModule.forChild(rountes)
  ],
  providers:[
    RegistrationService
  ]
})
export class RegistrationModule { }
