import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        // req.url = 'something NEW URL';  XX not possible

        const modifiedRequest = req.clone({
            headers: req.headers.append('Auth', 'xyz')
        });

        return next.handle(modifiedRequest);
        
    }
}