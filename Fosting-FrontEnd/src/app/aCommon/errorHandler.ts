import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

 export class ErrorHandler {
    static handleErrorFromObservable(err: HttpErrorResponse) {

        if (err.error instanceof Error) {
            console.error('An error occurred:', err.error.message);
        } else {
            console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
        }

        return throwError(err);
    }
}