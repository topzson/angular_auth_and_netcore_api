import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { TokenApiModel } from '../models/token-api.model';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private toast: NgToastService,private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();

    if(myToken){
      request = request.clone({
        setHeaders:{Authorization:`Bearer ${myToken}`} // "Bearer "+myToken
      })
    }
    return next.handle(request).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            // this.toast.warning({detail:"Warning", summary:"Token is expired, Please Login again"});
            // this.router.navigate(['login']);
            this.handleUnAuthorizedError(request,next);
            
          }
        }
        return throwError(()=> err);
      })
    );
  }

  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler){
    // const accesstoken = this.auth.getToken()!;
    // const refreshToken = this.auth.getRefreshToken()!;
    let tokenApiModel = new TokenApiModel();
    tokenApiModel.accessToken = this.auth.getToken()!;
    tokenApiModel.refreshToken = this.auth.getRefreshToken()!;
    return this.auth.renewToken(tokenApiModel)
    .pipe(
      switchMap((data:TokenApiModel)=>{
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToken(data.accessToken);
        req = req.clone({
          setHeaders:{Authorization:`Bearer ${data.accessToken}`} // "Bearer "+myToken
        })
        return next.handle(req);
      }),
      catchError((err)=>{
        return throwError(()=>{
          this.toast.warning({detail:"Warning", summary:"Token is expired, Please Login again"});
            this.router.navigate(['login']);
        })
      })
    )

  }

  

}
