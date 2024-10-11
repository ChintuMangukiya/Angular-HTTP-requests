import {  HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        // req.url = 'something NEW URL';  XX not possible

        console.log(req.url);
        console.log("Request is on its way");

        return next.handle(req);
        
    }
}