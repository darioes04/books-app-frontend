import { BookService } from './../../services/book.service';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, input, Input, Output, output } from '@angular/core';
import { Book } from '../../interfaces/book.interface';
import { EditBookComponent } from "./edit-book/edit-book.component";

@Component({
  selector: 'book-card',
  imports: [EditBookComponent],
  templateUrl: './book-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCardComponent { 

  bookCard = input.required<Book>();

  @Output() delete = new EventEmitter<Book>();
  @Output() update = new EventEmitter<Book>();
 
  showEditForm:boolean = false;

  bookService = inject(BookService);

  onDelete() {
    this.delete.emit(this.bookCard());
  }

  onUpdate(updatedBook: Book) {
    console.log('Fase 2: ', updatedBook);
    this.update.emit(updatedBook);
  }

  onEditForm() {
    this.showEditForm = !this.showEditForm;
  }



}

