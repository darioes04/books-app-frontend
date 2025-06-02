import { BookService } from '../../../services/book.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, EventEmitter, inject, Input, input, Output, Signal, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../../../interfaces/book.interface';
import { checkFields } from '../../../input-check/form-book-check';

@Component({
  selector: 'edit-book',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-book.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditBookComponent {

  @Output() updatedBook = new EventEmitter<Book>();
  @Output() isEditFormSubmited = new EventEmitter<boolean>();

  book: Book = {
    id: 0,
    title: '',
    author: '',
    isbn: '',
    publishedDate: '',
  };

  selectedBook = input<Book>();

  bookService = inject(BookService);


   contactForm = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    isbn: new FormControl(''),
    publishedDate: new FormControl(''),
  });

  constructor() {
    effect(() => {
      const book = this.selectedBook();
      if (book) {
        this.contactForm.patchValue(book);
      }
    });
  }


  onSubmit() {

    const formData = this.contactForm.value;

    this.book = {
      id: this.selectedBook()?.id,
      title: formData.title,
      isbn: formData.isbn,
      publishedDate: formData.publishedDate,
      author: formData.author,
    };

    console.log('Fase 1: ', this.book);

   
    if(checkFields(this.book)){
      this.bookService.updatebook(this.book).subscribe({
        next: (response) => {
          console.log('Libro actualizado correctamente', response);
          this.updatedBook.emit(response)
        },
        error: (error) => {
          console.error('Error al actualizar el libro', error);
        },
      });
    }

    this.isEditFormSubmited.emit(true);

  }
}
