import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VideoMyComponent } from './components/video-my/video-my.component';
import { VideoLikedComponent } from './components/video-liked/video-liked.component';
import { VideoDislikedComponent } from './components/video-disliked/video-disliked.component';
import { VideoAddComponent } from './components/video-add/video-add.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { VideoService } from '../../aCommon/services/video.service';
import { VideoComponent } from 'src/app/aCommon/components/video/video.component';
import { SharedModule } from 'src/app/aCommon/shared.module';


const itemRoutes: Routes = [
    {
        path: 'myvideo',
        component: VideoMyComponent
    },
    {
        path: 'likedvideo',
        component: VideoLikedComponent
    },
    {
        path: 'dislikedvideo',
        component: VideoDislikedComponent
    },
    {
        path: 'addvideo',
        component: VideoAddComponent
    },
    {
        path: '',
        redirectTo: 'myvideo'
    }
];

const router: Routes = [
    {
        path: ':id',
        component: ProfileComponent,
        children: itemRoutes
    },
    {
        path: '',
        component: ProfileComponent,
        children: itemRoutes
    }
];


@NgModule({
    declarations: [
        ProfileComponent,
        VideoAddComponent,
        VideoMyComponent,
        VideoLikedComponent,
        VideoDislikedComponent
    ],
    imports: [
        RouterModule.forChild(router),
        CommonModule,
        FormsModule,
        SharedModule
    ],
    providers: [
        VideoService
    ]
})
export class ProfileModule { }
