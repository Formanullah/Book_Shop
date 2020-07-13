import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import { User } from './_models/user';
import { BookService } from './_services/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  cartItemCount ;
  // title = 'DatingApp-SPA';
  constructor(private authService: AuthService, private bookService: BookService) {}
  ngOnInit() {
    const token = localStorage.getItem('token');
    const books = localStorage.getItem('books');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      this.authService.currentUser = user;
       // this.authService.changeMemberPhoto(user.photoUrl);
    }
    if (books)
    {
      this.bookService.currentCartCount.next(JSON.parse(books).length);
    }
    this.bookService.currentMessage.subscribe(msg => this.cartItemCount = msg);
  }
}
