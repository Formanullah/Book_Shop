import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { Book } from 'src/app/_models/book';
import { BookService } from 'src/app/_services/book.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {

  @Input() book: Book;
  bookAddedTocart: Book[];
  cartItemCount = 0;

  constructor(private authService: AuthService,
              private bookService: BookService, private alertify: AlertifyService  ) { }

  ngOnInit() {
  }

  /* sendLike(id: number) {
    this.bookService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.alertify.success('You have like: ' + this.user.knownAs);
    }, error => {
      this.alertify.error(error);
      console.log(error);
    });
  } */

  OnAddCart(book: Book)
            {
              console.log(book);
              this.bookAddedTocart = this.bookService.getBookFromCart();
              if (this.bookAddedTocart == null)
              {
                this.bookAddedTocart = [];
                this.book.totalQuantity = 1;
                this.book.totalPrice = this.book.price * this.book.totalQuantity ;
                this.bookAddedTocart.push(book);
                this.bookService.addBookToCart(this.bookAddedTocart);
                this.alertify.success('Book add to card');

              }
              else
              {
                const tempProduct = this.bookAddedTocart.find(p => p.id === book.id);
                if (tempProduct == null)
                {
                  this.book.totalQuantity = 1;
                  this.book.totalPrice = this.book.price;
                  this.bookAddedTocart.push(book);
                  this.bookService.addBookToCart(this.bookAddedTocart);
                  this.alertify.success('Book add to card');
                }
                else
                {
                  this.alertify.error('Book already exist in cart');
                }

              }
              this.cartItemCount = this.bookAddedTocart.length;
              // this.cartEvent.emit(this.cartItemCount);
              this.bookService.updateCartCount(this.cartItemCount);
            }
}
