import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { UserModel } from "../models/user.model";

@Injectable()
export class UserService {

    constructor(private httpClient: HttpClient) {

    }

    public getUserInfo(id: string): Observable<UserModel> {
        return this.httpClient.get(environment.url + `/User/ProfileUser/${id}`) as Observable<UserModel>;
    }

    public findUserByName(name: string): Observable<UserModel[]> {
        return this.httpClient.get(environment.url + `/User/FindUserByName/${name}`) as Observable<UserModel[]>;
    }

    public findSubscriptions(): Observable<UserModel[]> {
        return this.httpClient.get(environment.url + `/User/FindSubscriptions`) as Observable<UserModel[]>;
    }

    public subscribe(id: string): Observable<Object> {
        return this.httpClient.put(environment.url + `/User/Subscribe/${id}`, {});
    }

    public updateUserInfo(userModel: UserModel): Observable<Object> {
        return this.httpClient.put(environment.url + `/User/UpdateUserInfo`, userModel);
    }

    public updateUserPhoto(photo:File): Observable<Object> {
        let data = new FormData();
        data.append('photo', photo);

        return this.httpClient.post(environment.url + `/User/UpdateUserPhoto`, data);
    }
}