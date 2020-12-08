import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../services/authorization.service';

@Injectable()
export class GlobalErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    authorizationService: AuthorizationService,
    public toasterService: ToastrService
  ) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.status === 201) {
          this.toasterService.success(event.body.message, status, { positionClass: 'toast-bottom-center' });
        }  else if(event instanceof HttpResponse && event.status === 202) {
          this.toasterService.success(event.body.message, status, { positionClass: 'toast-bottom-center' });
        }
      }),
      retry(1),
  catchError((error: HttpErrorResponse) => {
    if (error.status === 401) {
      this.toasterService.error("Access denied. Please enter the correct password and try again.", `${error.status}`, { positionClass: 'toast-bottom-center'});      
    } else if(error.status === 404) {
      this.toasterService.error('User not found. Please enter the correct information and try again.', `${error.status}`, { positionClass: 'toast-bottom-center'})
    }
    else if(error.status == 500) {
      this.toasterService.error('Internal server error, please try again later.', `${error.status}`, { positionClass: 'toast-bottom-center'});
    }
    return throwError(error);
  })
    )
  }
}
