import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { VideoAddModel } from '../../models/video-add.model';
import { VideoService } from '../../../../aCommon/services/video.service';

@Component({
  selector: 'app-video-add',
  templateUrl: './video-add.component.html',
  styleUrls: ['./video-add.component.less']
})
export class VideoAddComponent {

  photo: File;
  video: File;
  videoAdd: VideoAddModel = new VideoAddModel();

  constructor(private http: HttpClient,
    private nav: Router,
    private toastr: ToastrService,
    private videoService: VideoService) {

  }

  loadPhoto(event) {
    let photo = event.target.files[0];

    if (photo.type.match('png') || photo.type.match('jpeg')) {
      this.toastr.success('Photo was uploaded.');
      this.photo = photo;
    }
    else {
      this.toastr.error('Photo should be in png or jpeg format!!!');
    }
  }

  loadVideo(event) {
    let video = event.target.files[0];

    if (video.type.match('mp4')) {
      this.toastr.success('Video was uploaded.');
      this.video = video;
    }
    else {
      this.toastr.error('Video should be in mp4 format!!!');
    }
  }

  load() {
    this.videoService.uploadVideo(this.videoAdd, this.photo, this.video)
      .subscribe(
        (resp) => {
          console.log(resp);
          this.nav.navigate(['/main/profile/' + localStorage.getItem(environment.id) + '/myvideo']);
        },
        (error: HttpErrorResponse) => {
          if (error.error != null && error.error != '') {
            this.toastr.error(error.error);
          } else {
            this.toastr.error(error.message);
          }
        });
  }

}