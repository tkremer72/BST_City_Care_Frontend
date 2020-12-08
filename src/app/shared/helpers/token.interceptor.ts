import { AuthorizationService } from '../services/authorization.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authorizationService: AuthorizationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authorizationService.getToken();
    let newHeaders = req.headers;
    if (token) {
      newHeaders = newHeaders.append('jwt', token);
    }
    const authReq = req.clone({ headers: newHeaders });
    return next.handle(authReq);
  }
}