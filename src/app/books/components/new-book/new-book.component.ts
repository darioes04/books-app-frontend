import { BookService } from './../../services/book.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, input, Output, Signal, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../../interfaces/book.interface';
import { checkFields } from '../../input-check/form-book-check';


@Component({
  selector: 'new-book',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './new-book.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class NewBookComponent {

  @Output() newBookSelected = new EventEmitter<Book>();

  book: Book = {
    id: 0,
    title: '',
    author: '',
    isbn: '',
    publishedDate: '',
  };

  bookService = inject(BookService);

  showNewForm:boolean = false;

  
  contactForm = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    isbn: new FormControl(''),
    publishedDate: new FormControl('')
  });

  onNewForm(){
    this.showNewForm = !this.showNewForm;

  }
  

  onSubmit() {
    const formData = this.contactForm.value;

    this.book = {
      title: formData.title,
      isbn: formData.isbn,
      publishedDate: formData.publishedDate,
      author: formData.author
    };


    if(checkFields(this.book)){ 
      this.bookService.addBook(this.book).subscribe({
        next: (response) => {
          console.log('Libro añadido correctamente', response);
          this.newBookSelected.emit(response);
          this.contactForm.reset();
        },
        error: (error) => {
          alert(`Ya existe un libro registrado con el isbn ${this.book.isbn}`)
          console.error('Error al añadir el libro', error);
        }
      });
    } 
    this.showNewForm = !this.showNewForm;
  }
}
