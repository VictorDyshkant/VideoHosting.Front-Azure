import { Injectable } from "@angular/core";

import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { RegistrationModel } from "../models/Registration.model";

@Injectable()
export class RegistrationService {

    constructor(private httpClient: HttpClient) {

    }

    public doExist(email: string): Observable<Object> {
        return this.httpClient.get(environment.url + "/Authorization/IsExist/" + email);
    }

    public registrate(registrationModel: RegistrationModel): Observable<Object> {
        return this.httpClient.post(environment.url + "/Authorization/Registrate", registrationModel);
    }

}