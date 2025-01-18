import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  private defaultTimeout = 5000; // Thời gian timeout mặc định (ms)

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const customTimeout = req.headers.get('timeout'); // Kiểm tra timeout tùy chỉnh từ headers
    const timeoutValue = customTimeout ? +customTimeout : this.defaultTimeout;

    return next.handle(req).pipe(
      timeout(timeoutValue), // Áp dụng timeout
      catchError((error) => {
        if (error.name === 'TimeoutError') {
          console.error('Request timed out:', req.url);
          return throwError(() => new Error('Request timed out'));
        }
        return throwError(() => error);
      })
    );
  }
}
