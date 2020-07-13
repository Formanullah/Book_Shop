import { Book } from './book';

export interface Order {
    name: string;
    userId: number;
    country: string;
    city: string;
    postalCode: number;
    streetAddress: string;
    mobileNo: string;
    emailAddress: string;
    CartItems: Book[];
}
