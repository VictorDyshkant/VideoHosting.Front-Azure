import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from 'src/app/aCommon/services/user.service';

const rountes: Routes =
  [
    {
      path: '',
      component: PersonalDataComponent
    }
  ];

@NgModule({
  declarations: [PersonalDataComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(rountes)
  ],
  providers: [UserService]
})
export class PersonalDataModule { }
