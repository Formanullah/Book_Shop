import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';
import { Book } from 'src/app/_models/book';
import { BookService } from 'src/app/_services/book.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { Category } from 'src/app/_models/category';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  @ViewChild('memberTabs', { static: true }) memberTabs: TabsetComponent;
  book: Book;
  category: Category;

  constructor( private bookService: BookService, private alertify: AlertifyService,
               private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
// tslint:disable-next-line: no-string-literal
      this.book = data['book'];
    });
}


}
