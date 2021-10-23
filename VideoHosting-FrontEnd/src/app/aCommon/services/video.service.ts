import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { VideoAddModel } from "../../modules/profile/models/video-add.model";



@Injectable()
export class VideoService {

    constructor(private httpClient: HttpClient) {

    }

    public uploadVideo(videoModel: VideoAddModel, photo: File, video: File): Observable<Object> {
        let data = new FormData();
        data.append('image', photo);
        data.append('video', video);
        data.append('name', videoModel.name);
        data.append('description', videoModel.description);
        return this.httpClient.post(environment.url + '/Video/UploadVideo', data);
    }

    public deleteVideo(videoId: string): Observable<Object> {
        return this.httpClient.delete(environment.url + `/Video/DeleteVideo/${videoId}`);
    }
}