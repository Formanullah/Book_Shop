import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BookService } from '../_services/book.service';
import { OrderDetails } from '../_models/orderDetails';

@Injectable()
export class OrderDetailResolver implements Resolve<OrderDetails> {
    constructor(private bookService: BookService, private aleritify: AlertifyService,
                private router: Router) {}
    resolve(route: ActivatedRouteSnapshot): Observable<OrderDetails> {
        // tslint:disable-next-line:no-string-literal
        return this.bookService.userOrderDetails(route.params['userId']).pipe(
            catchError( error => {
                this.aleritify.error('problem retriving Data');
                this.router.navigate(['/books']);
                return of(null);
            })
        );
    }
}
