import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { concatMap, switchMap } from 'rxjs/operators';
import { UserModel } from 'src/app/aCommon/models/user.model';
import { Video } from 'src/app/aCommon/models/video.model';
import { UserService } from 'src/app/aCommon/services/user.service';
import { VideoSelectionService } from 'src/app/aCommon/services/video-selection.service';
import { VideoService } from 'src/app/aCommon/services/video.service';
import { environment } from 'src/environments/environment';
import { CommentaryModel } from '../../models/comantary.model';
import { CommentaryService } from '../../services/commentary.service';

@Component({
  selector: 'app-video-watch',
  templateUrl: './video-watch.component.html',
  styleUrls: ['./video-watch.component.less']
})
export class VideoWatchComponent implements OnInit {

  video: Video;
  comentaries: CommentaryModel[];
  userId: string;
  isAdmin: boolean;
  user: UserModel;

  constructor(private commentaryService: CommentaryService,
    private videoSelectionService: VideoSelectionService,
    private videoService: VideoService,
    private userService: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private nav: Router) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(param => {
        let videoId = param.get('id');
        return of(videoId);
      }))
      .subscribe((videoId: string) => {

        this.videoSelectionService.getVideoById(videoId).subscribe((ok: Video) => {
          this.video = ok;
          console.log(this.video);
        },
          (error: HttpErrorResponse) => {
            if (error.error != null && error.error != '') {
              this.toastr.error(error.error);
            } else {
              this.toastr.error(error.message);
            }
          });

        this.commentaryService.getCommentariesByVideoId(videoId).subscribe((commentaries) => {
          this.comentaries = commentaries;
        },
          (error: HttpErrorResponse) => {
            if (error.error != null && error.error != '') {
              this.toastr.error(error.error);
            } else {
              this.toastr.error(error.message);
            }
          });
      });

    this.userId = localStorage.getItem(environment.id);
    this.userService.getUserInfo(this.userId)
      .subscribe((user) => {
        this.isAdmin = user.roles.includes(environment.adminRole);
        this.user = user;
      },
        (error: HttpErrorResponse) => {
          if (error.error != null && error.error != '') {
            this.toastr.error(error.error);
          } else {
            this.toastr.error(error.message);
          }
        });
  }

  createComment(comment) {
    let commentary = new CommentaryModel();
    commentary.userId = this.userId;
    commentary.videoId = this.video.id;
    commentary.content = comment.value;
    comment.value = '';

    this.commentaryService.addCommentary(commentary).pipe(concatMap((resp) => {
      return this.commentaryService.getCommentariesByVideoId(this.video.id);
    }))
      .subscribe((resp) => {
        this.comentaries = resp;
      },
        (error: HttpErrorResponse) => {
          if (error.error != null && error.error != '') {
            this.toastr.error(error.error);
          } else {
            this.toastr.error(error.message);
          }
        });
  }

  deleteVideo() {
    if (confirm('Do you want to delete this video?')) {
      this.videoService.deleteVideo(this.video.id).subscribe(resp => {
        this.nav.navigate(['/main/videofind']);
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

  deleteComentary(commentaryId: string) {
    console.log(commentaryId);
    if (confirm('Do you want to delete this comentary?')) {
      this.commentaryService.deleteCommentary(commentaryId)
        .pipe(concatMap((resp) => {
          return this.commentaryService.getCommentariesByVideoId(this.video.id);
        }))
        .subscribe((resp) => {
          this.comentaries = resp;
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

  putLike() {
    this.commentaryService.putLike(this.video.id).subscribe(resp => { });

    console.log("dd");
    if (this.video.liked) {
      this.video.likes--;
      this.video.liked = false;
    }
    else {
      if (this.video.dislikes) {
        this.video.dislikes--;
      }
      this.video.likes++;
      this.video.liked = true;
      this.video.disliked = false;
    }
  }

  putDislike() {
    this.commentaryService.putDisLike(this.video.id).subscribe(resp => { });

    console.log("dd");
    if (this.video.disliked) {
      this.video.dislikes--;
      this.video.disliked = false;
    }
    else {
      if (this.video.liked) {
        this.video.likes--;
      }
      this.video.dislikes++;
      this.video.disliked = true;
      this.video.liked = false;
    }
  }

}
