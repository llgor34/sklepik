import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpProxyInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<unknown>, next: HttpHandler) {
        const clonedRequest = request.clone({
            withCredentials: true,
            url: request.url.replace('api', environment.apiAddress),
        });
        return next.handle(clonedRequest);
    }
}
