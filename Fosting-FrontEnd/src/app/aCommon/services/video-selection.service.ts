import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Video } from "../models/video.model";

@Injectable()
export class VideoSelectionService {

    constructor(private httpClient: HttpClient) {

    }

    public getVideoById(id: string): Observable<Video> {
        return this.httpClient.get(environment.url + `/Video/GetVideoById/${id}`) as Observable<Video>;
    }

    public getUsersVideos(id: string): Observable<Video[]> {
        return this.httpClient.get(environment.url + `/Video/UsersVideos/${id}`) as Observable<Video[]>;
    }

    public getLikedVideos(id: string): Observable<Video[]> {
        return this.httpClient.get(environment.url + `/Video/LikedVideos/${id}`) as Observable<Video[]>;
    }

    public getDislikedVideos(id: string): Observable<Video[]> {
        return this.httpClient.get(environment.url + `/Video/DislikedVideos/${id}`) as Observable<Video[]>;
    }

    public getVideosSubscripters(): Observable<Video[]> {
        return this.httpClient.get(environment.url + `/Video/GetVideosSubscripters/`) as Observable<Video[]>;
    }

    public getVideosByName(name: string): Observable<Video[]> {
        return this.httpClient.get(environment.url + `/Video/GetVideosByName/${name}`) as Observable<Video[]>;
    }
}