import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../services/token/token.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    util : UtilService;

    constructor(private toastr: ToastrService,
                private spinnerService: Ng4LoadingSpinnerService,
                private router: Router) {
        this.util = UtilService.getInstance();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
        let authRequest : any;

        this.spinnerService.show();

        if(this.util.isLoggedIn()){
            let token = localStorage.getItem("cmTkn");
            
            authRequest = req.clone({
                setHeaders: {
                    'Authorization' : token
                }
            });
            return next.handle(authRequest).do((event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {

                //token ok.. continua o processo (pode ser implementado a logica de sempre atualizar o token)

                //desativando loading
                this.spinnerService.hide();
              }
            }, (err: any) => {              

              if (err instanceof HttpErrorResponse) {      
                //desativando loading
                this.spinnerService.hide();
                                
                if (err.status === 401) {
                  //token expirado, realize o logout

                  localStorage.removeItem("cmUsr");
                  localStorage.removeItem("cmTkm");
                  this.router.navigate(['/login']);
                } 
              }
            });
        } else {
          return next.handle(req).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {              
              //desativando loaging
              this.spinnerService.hide();
            }
          }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                this.spinnerService.hide();
            }
          });
        }
    }

}
