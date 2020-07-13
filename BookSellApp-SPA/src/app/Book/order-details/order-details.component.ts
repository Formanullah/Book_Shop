import { ActivatedRoute } from '@angular/router';
import { OrderDetails } from './../../_models/orderDetails';
import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/_services/book.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderDetails: OrderDetails[];
  totolOrder: OrderDetails[][] = [];
  order: OrderDetails[] = null;

  constructor(private bookservice: BookService, private alertifyService: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      // tslint:disable-next-line: no-string-literal
            this.orderDetails = data['orderdetails'];
          });
    this.getIndivisualOrder();
    console.log(this.orderDetails);
}
getIndivisualOrder() {
  let ordersIds = this.orderDetails.map(order => order.orderId);
  ordersIds = ordersIds.sort((a, b) => 0 - (a > b ? -1 : 1)).filter((x, i, a) => !i || x !== a[i - 1]);
  console.log(ordersIds);
  ordersIds.forEach(element => {
    const order = this.orderDetails.filter(u => u.orderId === element);
    order[0].quantiy = order.reduce((acc, t) => acc + t.totalQuantity, 0);
    order[0].price = order.reduce((acc, t) => acc + t.totalPrice, 0);
    this.totolOrder.push(order);
  });
}
showDetails(details: OrderDetails[]) {
  this.order = details;
}
}
