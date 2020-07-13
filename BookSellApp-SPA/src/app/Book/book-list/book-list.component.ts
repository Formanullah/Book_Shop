import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/_models/book';
import { User } from 'src/app/_models/user';
import { BookService } from 'src/app/_services/book.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/_models/category';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[];
  categories: Category[];
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
 // pagination: Pagination;
  userParams: any = {};

  constructor(private bookService: BookService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
     this.route.data.subscribe( data => {
// tslint:disable-next-line: no-string-literal
      this.books = data['books'];
      // tslint:disable-next-line:no-string-literal
     // this.pagination = data['users'].pagination;
    });
     this.bookService.getCategories().subscribe(res => {
      this.categories = res;
    }, error => this.alertify.error(error));
    // console.log(this.pagination);
    /* this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive'; */
  }

  pageChanged(event: any): void {
   // this.pagination.currentPage = event.page;
    // this.loadbooks();
  }

  resetFilters() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    // this.loadbooks();
  }

  loadbooks(id) {
    this.bookService.getBooks(id)
      .subscribe(res => {
        this.books = res;
       // this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }


}
