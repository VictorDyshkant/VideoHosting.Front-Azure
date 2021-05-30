import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { HttpClient } from '@angular/common/http';
import { LoginModel } from "../../modules/login/models/login.model";
import { environment } from "src/environments/environment";

@Injectable()
export class LoginService {

    constructor(private httpClient: HttpClient) {

    }

    public authenticate(loginModel: LoginModel): Observable<Object> {
        return this.httpClient.post(environment.url + "/Authorization/Authenticate", loginModel);
    }

    public logout(): Observable<Object>{
        return this.httpClient.post(environment.url + "/Authorization/Logout", {});
    }
}