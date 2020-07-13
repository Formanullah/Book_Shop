import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from './_services/auth.service';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { BsDropdownModule } from 'ngx-bootstrap';
import { AlertifyService } from './_services/alertify.service';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { BookService } from './_services/book.service';
import { FileUploadModule } from 'ng2-file-upload';
import { BookAddComponent } from './Book/book-add/book-add.component';
import { BookDetailsComponent } from './Book/book-details/book-details.component';
import { BookCardComponent } from './Book/book-card/book-card.component';
import { BookListComponent } from './Book/book-list/book-list.component';
import { BooklistResolver } from './_resolvers/book-list.resolver';
import { BookDetailResolver } from './_resolvers/book-detail.resolver';
import { AddToCardComponent } from './Book/add-to-card/add-to-card.component';
import { BookCheckOutComponent } from './Book/book-check-out/book-check-out.component';
import { OrderDetailsComponent } from './Book/order-details/order-details.component';
import { OrderDetailResolver } from './_resolvers/order-detail.resolver';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      BookAddComponent,
      BookCardComponent,
      BookListComponent,
      BookDetailsComponent,
      AddToCardComponent,
      BookCheckOutComponent,
      OrderDetailsComponent,
      LoginComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BsDatepickerModule.forRoot(),
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      FileUploadModule
   ],
   providers: [
      AuthService,
      AlertifyService,
      ErrorInterceptorProvider,
      BookService,
      BooklistResolver,
      BookDetailResolver,
      OrderDetailResolver,
      AuthGuard,
      PreventUnsavedChanges
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
