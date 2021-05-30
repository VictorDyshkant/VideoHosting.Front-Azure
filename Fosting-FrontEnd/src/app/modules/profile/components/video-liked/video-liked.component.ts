import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Video } from 'src/app/aCommon/models/video.model';
import { VideoSelectionService } from 'src/app/aCommon/services/video-selection.service';

@Component({
  selector: 'app-video-liked',
  templateUrl: './video-liked.component.html',
  styleUrls: ['./video-liked.component.less']
})
export class VideoLikedComponent implements OnInit {

  videos: Video[];
  $videos: Observable<Video[]>;

  constructor(private activatedRoute: ActivatedRoute,
    private videoSelectionService: VideoSelectionService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    let userId = (<any>this.activatedRoute.snapshot)._urlSegment.segments[2].path;
    
    this.$videos = this.videoSelectionService.getLikedVideos(userId).pipe(
      catchError((error: HttpErrorResponse) => {
        this.toastr.error(error.message ?? error.error);
        return throwError(error);
      })
    );
  }

}
