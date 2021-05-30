import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './aCommon/guards/auth.guard';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./modules/registration/registration.module').then(m => m.RegistrationModule)
  },
  {
    path: 'main',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule)
  },
  {
    path: 'personalData',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/personal-data/personal-data.module').then(m => m.PersonalDataModule)
  }, 
  {
    path: 'watchvideo/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/video-watch/video-watch.module').then(m => m.VideoWatchModule)
  },
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
