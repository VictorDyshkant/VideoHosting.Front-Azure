import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoWatchComponent } from './components/video-watch/video-watch.component';
import { CommentaryService } from './services/commentary.service';
import { UserService } from 'src/app/aCommon/services/user.service';
import { VideoSelectionService } from 'src/app/aCommon/services/video-selection.service';
import { RouterModule, Routes } from '@angular/router';
import { VideoService } from 'src/app/aCommon/services/video.service';

const routes: Routes = [
  {
    path: '',
    component: VideoWatchComponent
  }
]


@NgModule({
  declarations: [VideoWatchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    CommentaryService,
    VideoSelectionService,
    VideoService,
    UserService
  ]
})
export class VideoWatchModule { }
