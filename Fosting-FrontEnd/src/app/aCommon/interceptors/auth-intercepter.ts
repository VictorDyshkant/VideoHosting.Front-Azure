import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from "src/environments/environment";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private nav: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const params = req.clone(
            {
                setHeaders: {
                    Authorization: 'Bearer ' + localStorage.getItem(environment.token)
                }
            }
        )
        console.log(params);

        return next.handle(params).pipe(
            catchError((error: HttpErrorResponse) => {
                console.log(error);
                if (error.status == 401) {
                    localStorage.removeItem(environment.token);
                    localStorage.removeItem(environment.id);
                    this.nav.navigate(['/login']);
                }
                return throwError(error);
            })
        );
    }
}