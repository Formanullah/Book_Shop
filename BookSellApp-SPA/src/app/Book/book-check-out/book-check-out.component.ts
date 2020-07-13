import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/_services/book.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Book } from 'src/app/_models/book';
import { FormGroup, FormBuilder, Validators, MaxLengthValidator } from '@angular/forms';
import { Order } from 'src/app/_models/order';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-check-out',
  templateUrl: './book-check-out.component.html',
  styleUrls: ['./book-check-out.component.css']
})
export class BookCheckOutComponent implements OnInit {

  bookAddedInCart: Book[];
  totalprice: any;
  orderDetailsForm: FormGroup;
  order: Order;
  user: User;


  constructor(private bookService: BookService, private alertify: AlertifyService,
              private fb: FormBuilder, private authService: AuthService, private routes: Router) { }

  ngOnInit() {
    this.loadCartItems();
    this.orderForm();
    this.loggedIn();
  }

  get emailAddress(){
    return this.orderDetailsForm.get('emailAddress');
    }
  get mobileNo(){
      return this.orderDetailsForm.get('mobileNo');
      }
  orderForm() {
    // frombuilder: replace of FormGroup
    this.orderDetailsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      city: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      streetAddress: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.maxLength(11)]],
      emailAddress: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    });
  }

  checkOut()
  {
    if (this.orderDetailsForm.valid && this.bookAddedInCart != null) {
      this.order = Object.assign({}, this.orderDetailsForm.value);
      this.order.CartItems = this.bookAddedInCart;
      if (this.user != null) {
        this.order.userId = this.user.id;
      }
      this.bookService.checkOut(this.order).subscribe(() => {
        this.alertify.success('Order complete successful');
        this.bookService.removeAllBookFromCart();
        this.bookAddedInCart = null;
        this.orderDetailsForm.reset();
        if (this.user != null) {
        this.routes.navigate(['/addtocard/checkout/', this.user.id]);
        }
      }, error => {
        this.alertify.error(error);
      });
      // console.log(this.order);
    }
  }

  loggedIn() {

    if (this.authService.loggedIn() && this.bookAddedInCart != null) {
      this.user = this.authService.currentUser;
      this.orderDetailsForm.setValue({
      name: this.user.username,
      city: this.user.city,
      country: this.user.country,
      postalCode: this.user.postalCode,
      streetAddress: this.user.streetAddress,
      mobileNo: this.user.mobileNo,
      emailAddress: this.user.emailAddress,
      });
      // console.log(this.user);
    }
   }

  cancel() {
    this.orderDetailsForm.reset();
  }


  loadCartItems()
  {
    this.bookAddedInCart = this.bookService.getBookFromCart();
    let total = 0;
    // tslint:disable-next-line:forin
    for (const i in this.bookAddedInCart) {
      total = total + (this.bookAddedInCart[i].totalQuantity * this.bookAddedInCart[i].price);
   }
    this.totalprice = total;
  }
}
