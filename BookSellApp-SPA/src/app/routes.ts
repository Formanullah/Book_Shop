import { BookDetailResolver } from './_resolvers/book-detail.resolver';
import { BookListComponent } from './Book/book-list/book-list.component';
import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { BookAddComponent } from './Book/book-add/book-add.component';
import { BookDetailsComponent } from './Book/book-details/book-details.component';
import { BooklistResolver } from './_resolvers/book-list.resolver';
import { AddToCardComponent } from './Book/add-to-card/add-to-card.component';
import { BookCheckOutComponent } from './Book/book-check-out/book-check-out.component';
import { OrderDetailResolver } from './_resolvers/order-detail.resolver';
import { OrderDetailsComponent } from './Book/order-details/order-details.component';
import { LoginComponent } from './login/login.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
/* import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ListsResolver } from './_resolvers/list.resolver';
import { MessagesResolver } from './_resolvers/messages.resolver'; */

export const appRoutes: Routes = [
    { path: '', component: BookListComponent, resolve: {books: BooklistResolver}},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'addbook', component: BookAddComponent},
    {path: 'books', component: BookListComponent, resolve: {books: BooklistResolver}},
    {path: 'books/:id', component: BookDetailsComponent,
        resolve: {book: BookDetailResolver}},
    {path: 'addtocard', component: AddToCardComponent},
    {path: 'addtocard/checkout', component: BookCheckOutComponent, canDeactivate: [PreventUnsavedChanges]},
    {path: 'addtocard/checkout/:userId', component: OrderDetailsComponent,
        resolve: {orderdetails: OrderDetailResolver}},
   /* {path: '',
    runGuardsAndResolvers: 'always',
     canActivate: [AuthGuard],
    children: [
        {path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}},
        {path: 'members/:id', component: MemberDetailComponent,
        resolve: {user: MemberDetailResolver}},
        {path: 'member/edit', component: MemberEditComponent,
        resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
        {path: 'messages', component: MessagesComponent, resolve: {messages: MessagesResolver}},
        {path: 'lists', component: ListsComponent, resolve: {users: ListsResolver}},
    ]
}, */
    {path: '**', redirectTo: '', pathMatch: 'full'}
];

