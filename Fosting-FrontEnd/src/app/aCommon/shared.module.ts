import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VideoComponent } from './components/video/video.component';
import { UserComponent } from './components/user/user.component';



@NgModule({
    declarations: [
        VideoComponent,
        UserComponent
    ],
    exports: [
        VideoComponent, 
        UserComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ]
})
export class SharedModule { }
