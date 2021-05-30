import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Video } from 'src/app/aCommon/models/video.model';
import { VideoSelectionService } from 'src/app/aCommon/services/video-selection.service';

@Component({
  selector: 'app-videofind',
  templateUrl: './video-find.component.html',
  styleUrls: ['./video-find.component.less']
})
export class VideoFindComponent implements OnInit {

  $videos: Observable<Video[]>;

  constructor(private videoSelectionService: VideoSelectionService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getSubscriptionVideos();
  }

  getSubscriptionVideos() {
    this.$videos = this.videoSelectionService.getVideosSubscripters().pipe(
      catchError((error: HttpErrorResponse) => {
        this.toastr.error(error.message ?? error.error);
        return throwError(error);
      })
    );
  }

  find(name: string) {
    if (name == '') {
      this.getSubscriptionVideos();
    } else {
      this.$videos = this.videoSelectionService.getVideosByName(name).pipe(
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.message ?? error.error);
          return throwError(error);
        })
      );
    }
  }

}
