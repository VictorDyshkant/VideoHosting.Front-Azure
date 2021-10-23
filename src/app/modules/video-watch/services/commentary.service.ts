import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CommentaryModel } from "../models/comantary.model";

@Injectable()
export class CommentaryService {

    constructor(private httpClient: HttpClient) {

    }

    public getCommentariesByVideoId(videoId: string): Observable<CommentaryModel[]> {
        console.log(videoId);
        return this.httpClient.get(environment.url + `/Commentary/CommentaryByVideo/${videoId}`) as Observable<CommentaryModel[]>;
    }

    public addCommentary(commentary: CommentaryModel): Observable<Object> {
        return this.httpClient.post(environment.url + `/Commentary/AddCommentary`, commentary) as Observable<Object>;
    }

    public deleteCommentary(commentId: string): Observable<Object> {
        console.log(commentId);
        return this.httpClient.delete(environment.url + `/Commentary/DeleteCommentary/${commentId}`) as Observable<Object>;
    }

    public putLike(videoId: string): Observable<Object> {
        return this.httpClient.put(environment.url + `/Commentary/PutLike/${videoId}`, {}) as Observable<Object>;
    }

    public putDisLike(videoId: string): Observable<Object> {
        return this.httpClient.put(environment.url + `/Commentary/PutDislike/${videoId}`, {}) as Observable<Object>;
    }

}