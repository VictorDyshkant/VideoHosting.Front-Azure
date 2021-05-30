import { Component, Input } from '@angular/core';
import { Video } from '../../models/video.model';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.less']
})
export class VideoComponent {

  @Input() video: Video;

  constructor() { }
}
