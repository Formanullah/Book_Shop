import { OrderDetails } from './../_models/orderDetails';
import { Book } from './../_models/book';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Category } from '../_models/category';
import { Order } from '../_models/order';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  baseUrl = environment.apiUrl + 'book/';
  currentCartCount = new BehaviorSubject(0);
  currentMessage = this.currentCartCount.asObservable();

  constructor(private http: HttpClient) {}

  addBook(book: Book, fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('title', book.title);
    formData.append('author', book.author);
    formData.append('price', book.price.toString());
    formData.append('categoryId', book.categoryId.toString());
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(this.baseUrl + 'addbook', formData);
  }

  getBooks(id): Observable<Book[]> {
    // return this.http.get<User>(this.baseUrl + 'users/' + id, httpOptios);
    return this.http.get<Book[]>(this.baseUrl + 'books/' + id);
  }
  getBook(id): Observable<Book> {
    // return this.http.get<User>(this.baseUrl + 'users/' + id, httpOptios);
    return this.http.get<Book>(this.baseUrl + id);
  }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + 'categories');
  }
  addBookToCart(books: any) {
    localStorage.setItem('books', JSON.stringify(books));
  }
  getBookFromCart() {
    // return localStorage.getItem("product");
    return JSON.parse(localStorage.getItem('books'));
  }
  removeAllBookFromCart() {
    this.currentCartCount.next(0);
    return localStorage.removeItem('books');
  }
  updateCartCount(count: number) {
    this.currentCartCount.next(count);
  }
  updateCart(books: any) {
    localStorage.removeItem('books');
    localStorage.setItem('books', JSON.stringify(books));
  }
  checkOut(model: Order) {
    return this.http.post(this.baseUrl , model);
  }
  userOrderDetails(userId: number): Observable<OrderDetails[]> {
    return this.http.get<OrderDetails[]>(this.baseUrl + 'orderdetails/' + userId);
  }
}
