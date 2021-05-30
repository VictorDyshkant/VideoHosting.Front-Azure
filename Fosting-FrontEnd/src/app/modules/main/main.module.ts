import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from 'src/app/aCommon/services/login.service';
import { MainComponent } from './components/main/main.component';
import { VideoSubscriptionsComponent } from './components/video-subscriptions/video-subscriptions.component';
import { RouterModule, Routes } from '@angular/router';
import { VideoFindComponent } from './components/video-find/video-find.component';
import { SharedModule } from 'src/app/aCommon/shared.module';
import { VideoSelectionService } from 'src/app/aCommon/services/video-selection.service';

const router: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'profile/:id',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'videofind',
        component: VideoFindComponent
      },
      {
        path: 'videofind/:str',
        component: VideoFindComponent
      },
      {
        path: 'videosubscriptions',
        component: VideoSubscriptionsComponent
      },
      {
        path: '', redirectTo: 'videofind', pathMatch: 'prefix'
      }
    ]
  }
];


@NgModule({
  declarations: [
    VideoFindComponent,
    VideoSubscriptionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    SharedModule
  ],
  providers: [
    LoginService,
    VideoSelectionService
  ]
})
export class MainModule { }
