export interface OrderDetails {
    bookId: number;
    bookName: string;
    orderId: number;
    orderTime: Date;
    totalQuantity: number;
    totalPrice: number;
    quantiy?: number;
    price?: number;
}
