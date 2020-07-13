import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BookService } from '../_services/book.service';
import { Book } from '../_models/book';

@Injectable()
export class BooklistResolver implements Resolve<Book[]> {
    categoryId = 0;
    constructor(private bookService: BookService, private aleritify: AlertifyService,
                private router: Router) {}
    resolve(route: ActivatedRouteSnapshot): Observable<Book[]> {
        // tslint:disable-next-line:no-string-literal
        return this.bookService.getBooks(this.categoryId).pipe(
            catchError( error => {
                this.aleritify.error('problem retriving Books');
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
