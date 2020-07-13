import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/_models/book';
import { BookService } from 'src/app/_services/book.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-add-to-card',
  templateUrl: './add-to-card.component.html',
  styleUrls: ['./add-to-card.component.css']
})
export class AddToCardComponent implements OnInit {
  bookAddedTocart: Book[];
  total: any;

  constructor(private bookService: BookService, private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.bookAddedTocart = this.bookService.getBookFromCart();
    this.calculteAllTotal(this.bookAddedTocart);
    this.show();
  }
  show()
  {
    console.log(this.bookAddedTocart);
  }

  onAddQuantity(id)
  {
    // Get Product
    this.bookAddedTocart = this.bookService.getBookFromCart();
    this.bookAddedTocart.find(p => p.id === id).totalQuantity += 1;
    this.bookAddedTocart.find(p => p.id === id).totalPrice += this.bookAddedTocart.find(p => p.id === id).price;
    // Find produc for which we want to update the quantity
    // let tempProd= this.bookAddedTocart.find(p=>p.Id==product.Id);
    // tempProd.Quantity=tempProd.Quantity+1;
    // this.bookAddedTocart=this.bookAddedTocart.splice(this.bookAddedTocart.indexOf(product), 1)
   // Push the product for cart
   // this.bookAddedTocart.push(tempProd);


    this.bookService.updateCart(this.bookAddedTocart);
    this.calculteAllTotal(this.bookAddedTocart);

  }
  onRemoveQuantity(id)
  {
    this.bookAddedTocart = this.bookService.getBookFromCart();
    this.bookAddedTocart.find(p => p.id === id).totalQuantity -= 1;
    this.bookAddedTocart.find(p => p.id === id).totalPrice -= this.bookAddedTocart.find(p => p.id === id).price;
    this.bookService.updateCart(this.bookAddedTocart);
    this.calculteAllTotal(this.bookAddedTocart);

  }
  calculteAllTotal(allItems: Book[])
  {
    let total = 0;
    // tslint:disable-next-line:forin
    for (const i in allItems) {
      total = total + (allItems[i].totalQuantity * allItems[i].price);
   }
    this.total = total;
  }
  deleteItem(id)
  {
    this.bookAddedTocart = this.bookService.getBookFromCart();
    // tslint:disable-next-line:no-shadowed-variable
    const foundIndex = this.bookAddedTocart.findIndex(({ id }) => id === id);
    this.bookAddedTocart = this.bookAddedTocart.filter((_, index) => index !== foundIndex);
    if (this.bookAddedTocart.length  >= 1)
    {
    this.bookService.updateCart(this.bookAddedTocart);
    this.bookService.currentCartCount.next(this.bookAddedTocart.length);
    this.calculteAllTotal(this.bookAddedTocart);
    }
    else {
      this.bookService.removeAllBookFromCart();
      this.bookAddedTocart = null;
     }
    this.alertifyService.warning('Book remove from cart');
  }


}
