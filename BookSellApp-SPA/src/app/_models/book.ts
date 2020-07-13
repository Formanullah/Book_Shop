import { Category } from './category';

export interface Book {
    id: number;
    title: string;
    author: string;
    categoryId: number;
    price: number;
    photoUrl: string;
    Created: Date;
    categoryName: string;
    totalQuantity: number;
    totalPrice: number;
}
