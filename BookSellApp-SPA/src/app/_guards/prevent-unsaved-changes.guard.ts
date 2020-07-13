import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { BookCheckOutComponent } from '../Book/book-check-out/book-check-out.component';

@Injectable()

export class PreventUnsavedChanges implements CanDeactivate<BookCheckOutComponent> {
    canDeactivate(component: BookCheckOutComponent) {
        if (component.orderDetailsForm.dirty) {
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
        }
        return true;
    }
}
