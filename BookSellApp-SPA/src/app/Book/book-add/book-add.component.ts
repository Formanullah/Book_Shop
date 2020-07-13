import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { FileUploader, FileItem, FileUploaderOptions } from 'ng2-file-upload';
import { fileURLToPath } from 'url';
import { Book } from 'src/app/_models/book';
import { BookService } from 'src/app/_services/book.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Category } from 'src/app/_models/category';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {

 @Output() cancelAdd = new EventEmitter();
 @ViewChild('searchInput') searchInput: ElementRef;

 categories: Category[];
 book: Book;
 photoAddForm: FormGroup;
 uploader: FileUploader;
 hasBaseDropZoneOver = false;
 baseUrl = environment.apiUrl;
 fileToUpload: File = null;
 isImageChnaged: boolean;

 constructor(private bookService: BookService, private alertify: AlertifyService,
             private router: Router, private fb: FormBuilder) { }

 ngOnInit() {
   this.addBookForm();
   this.getCategories();
   // this.initializeUploader();
 }
 fileOverBase(e: any): void {
  this.hasBaseDropZoneOver = e;
}
initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'book/' + 'addbook',
      isHTML5: true,
      allowedFileType: ['image', 'string', 'number'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    this.book = Object.assign({}, this.photoAddForm.value);
    this.uploader.onBeforeUploadItem = (fileItem: any) => {
    fileItem.formData.push( { title: this.photoAddForm.get('title').value } );
    fileItem.formData.push( { author:  this.photoAddForm.get('author').value } );
    fileItem.formData.push( { categoryId:  this.photoAddForm.get('categoryId').value } );
    fileItem.formData.push( { price:  this.photoAddForm.get('price').value } );
   };
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };
  // cores error remove korar jno je ami file credentials er shate pataci na
    this.uploader.onSuccessItem = (item, response, status, headers) => {
    // upload hoar shate shate show korar jno
    if (response) {
      const res: Book = JSON.parse(response);
      const photo = {
        id: res.id,
        url: res.photoUrl,
        author: res.author,
        categoryId: res.categoryId,
        price: res.price,
        title: res.title
      };
      // this.photos.push(photo);
    }
  };
}
 addBookForm() {
   // frombuilder: replace of FormGroup
   this.photoAddForm = this.fb.group({
     title: ['', [Validators.required, Validators.minLength(4)]],
     author: ['', Validators.required],
     categoryId: ['', Validators.required],
     price: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(0)]]

   });
 }
 handleFileInput(files: FileList) {
  // console.log('change called');
  if (files && files.length) {
     this.isImageChnaged = true;
     this.fileToUpload = files.item(0);
  }
}

 addBook() {
    if (this.photoAddForm.valid) {
     this.book = Object.assign({}, this.photoAddForm.value);
     this.bookService.addBook(this.book, this.fileToUpload).subscribe(() => {
       this.alertify.success('Book Added successful');
     }, error => {
       this.alertify.error(error);
     },  /* () => {
      this.bookService.login(this.user).subscribe(() => {
       this.router.navigate(['']);
      });
     } */ );
   }
 }
 cancel() {
   this.photoAddForm.reset();
   this.searchInput.nativeElement.value = '';
 }
 getCategories() {
   this.bookService.getCategories().subscribe(res => {
     this.categories = res;
   }, error => this.alertify.error(error));
 }
 public onFileSelected() {

  console.log(this.uploader);

}
}
